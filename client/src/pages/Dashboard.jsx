import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api.js";
function Dashboard() {

  const [notes, setNotes] = useState([]);

  const [error, setError] = useState("")

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const [editingNoteId, setEditingNoteId] = useState(null);

  //  handleLogout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/")
  };
  // fetchNotes
  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes")
      setNotes(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  }
  useEffect(() => {
    fetchNotes();
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
      const response = await api.post("/notes", {
        title,
        content
      })
      console.log(response.data.message);
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
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
      {/* display notes  */}{/* display notes */}
      {notes.map((note) => (
        <div key={note._id}>
          {editingNoteId === note._id ? (
            <>
  <input
    value={title}
    onChange={(e) => {
      setTitle(e.target.value);
    }}
  />

  <textarea
    value={content}
    onChange={(e) => {
      setContent(e.target.value);
    }}
  />

  <button>
    Save
  </button>

  <button
    onClick={() => {
      setEditingNoteId(null);
      setTitle("");
      setContent("");
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
                  setTitle(note.title);
                  setContent(note.content);
                }}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard