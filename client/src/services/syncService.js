import db from "../db/database";
import api from "./api.js";

const syncNotes = async () => {
    console.log("Starting sync..");
    const queue = await db.syncQueue.toArray();

    for (const item of queue) {
        const note = await db.notes.get(item.noteId);
        if (item.operation === "create") {
            try {
                const response = await api.post("/notes", {
                    title: note.title,
                    content: note.content
                });

                note.serverId = response.data.note._id;
                note.syncStatus = "synced";
                await db.notes.put(note);

                await db.syncQueue.delete(item.id);
                
                console.log("Note synced:", response.data);
            }
            catch (error) {
                console.log("Sync failed:", error);
            }
        }
    }
};

export default syncNotes;