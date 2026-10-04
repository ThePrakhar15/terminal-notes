import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import syncNotes from "../services/syncService.js";
import db from "../db/database";
import api from "../services/api.js";

function Dashboard() {

  const [notes, setNotes] = useState([]);

  const [error, setError] = useState("")

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [editTitle, setEditTitle ] = useState("");

  const [editContent, setEditContent] = useState("");

  const navigate = useNavigate();

  const [editingNoteId, setEditingNoteId] = useState(null);

  //  handleLogout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/")
  };
  const saveNotesLocally = async (notes) =>{

    for( const serverNote of notes){
      const localNote = await db.notes.get(serverNote._id);

      if(localNote?.syncStatus === "pending"){
        continue;
      }
    await db.notes.put(
      // notes.map((note) => ({
      //   id: note._id,
      //   serverId: note._id,
      //   _id: note._id,
      //   user: note.user,
      //   title: note.title,
      //   content: note.content,
      //   version: note.version,
      //   isDeleted: note.isDeleted,
      //   lastModifiedBy: note.lastModifiedBy,
      //   updatedAt: note.updatedAt,
      //   syncStatus: "synced",
      // }))
     { id: serverNote._id ,
      serverId: serverNote._id ,
      _id: serverNote._id ,
      user: serverNote.user ,
      title: serverNote.title ,
      content: serverNote.content ,
      version: serverNote.version ,
      isDeleted: serverNote.isDeleted,
      lastModifiedBy: serverNote.lastModifiedBy ,
      updatedAt: serverNote.updatedAt ,
      syncStatus: "synced",
    });
  }
  };
  // fetchNotes
  const fetchNotes = async () => {
    try{
      const localNotes = await db.notes.where("syncStatus").anyOf("synced", "pending").toArray();

      setNotes(localNotes.filter(note => !note.isDeleted));

      const response = await api.get("/notes");

      await saveNotesLocally(response.data.notes);

      const updatedLocalNotes = await db.notes.where("syncStatus").anyOf("synced", "pending").toArray();

      setNotes(updatedLocalNotes.filter(note => !note.isDeleted));

    }catch(error){
      console.log("Server unavailable, using local notes");
    }
  };
  useEffect(() => {
    fetchNotes();
    syncNotes();
  }, []);
  const handleAddNote = async () => {
    if (title.trim() === "") {
      setError("Title is empty");
      return;
    }
    if (content.trim() === "") {
      setError("Content is empty");
      return;
    }
    setError("");
    try {
      const localId = crypto.randomUUID();
      const localNote = {
        id: localId,
        _id: localId,
        serverId: null,
        user: "current-user",
        title,
        content,
        version: 1,
        isDeleted: false,
        updatedAt: new Date().toISOString(),
        syncStatus:"pending",
      };

      await db.notes.put(localNote);

      await db.syncQueue.add({
        noteId: localId,
        operation: "create",
        createdAt: new Date().toISOString(),
      });
      // const response = await api.post("/notes", {
      //   title,
      //   content
      // })
      // console.log(response.data.message);
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      console.error("OFFLINE CREATE ERROR:"  , error);
      setError("offline create failed");
    }
  } 
  const handleUpdateNote = async () => {

    if (editTitle.trim() === "") {
      setError("Title is empty");
      return;
    }
    if (editContent.trim() === "") {
      setError("Content is empty");
      return;
    }
    setError("");
    try {
      // await api.put(`/notes/${editingNoteId}`, {
      //   title: editTitle,
      //   content: editContent
      // });

      const note = await db.notes.get(editingNoteId);

      if(!note){
        setError("Note not found locally");
        return;
      }
      
      note.title = editTitle;
      note.content = editContent;
      note.version += 1;
      note.syncStatus = "pending"

      await db.notes.put(note);

      await db.syncQueue.add({
        noteId: editingNoteId,
        operation: "update",
        createdAt: new Date().toISOString(),
      });

      fetchNotes();
      setEditingNoteId(null);
      setEditTitle("");
      setEditContent("");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  }

  const handleDeleteNote = async (noteID) => { 
    try{
      const note = await db.notes.get(noteID);

      if (!note){
        setError("Note not found locally");
        return;
      }

      note.isDeleted = true;
      note.syncStatus = "pending";

      await db.notes.put(note);

      await db.syncQueue.add({
        noteId: noteID,
        operation: "delete",
        createdAt: new Date().toISOString(),
      });

      fetchNotes();
    }catch (error){
      console.log("Offline delte failed:", error);
      setError("Offline delete failed");
    }
  }
  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p>{error}</p>}
      <input value={title} onChange={(e) => {
        setTitle(e.target.value)
      }} />
      <textarea value={content} onChange={(e) => {
        setContent(e.target.value)
      }} />
      <button onClick={handleAddNote}>Add Note</button>
      {/* display notes  */}
      {notes.map((note) => (
        <div key={note._id}>
          {editingNoteId === note._id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                }}
              />

              <textarea
                value={editContent}
                onChange={(e) => {
                  setEditContent(e.target.value);
                }}
              />

              <button onClick={handleUpdateNote}>
                Save
              </button>

              <button
                onClick={() => {
                  setEditingNoteId(null);
                  setEditTitle("");
                  setEditContent("");
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button
                onClick={() => {
                  setEditingNoteId(note._id);
                  setEditTitle(note.title);
                  setEditContent(note.content);
                }}
              >
                Edit
              </button>

              <button onClick = {() => handleDeleteNote(note._id)}>delete</button>
            </>
          )}
        </div>
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard