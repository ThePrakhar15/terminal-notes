import db from "../db/database";
import api from "./api.js";
let isSyncing = false;
const syncNotes = async () => {
    if (isSyncing) {
        console.log("Sync already running...");
        return;
    }
    isSyncing = true;
    try {
        console.log("Starting sync..");

        const queue = await db.syncQueue.toArray();

        for (const item of queue) {
            const note = await db.notes.get(item.noteId);

            if (!note) {
                console.log("Local note not found:", item.noteId);
                continue;
            }
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
                } catch (error) {
                    console.log("Create sync failed:", error);
                }
            }
            if (item.operation === "update") {
                try {
                    const response = await api.put(
                        `/notes/${note.serverId}`,
                        {
                            title: note.title,
                            content: note.content
                        }
                    );

                    note.version = response.data.note.version;
                    note.updatedAt = response.data.note.updatedAt;
                    note.lastModifiedBy = response.data.note.lastModifiedBy;
                    note.syncStatus = "synced";

                    await db.notes.put(note);

                    await db.syncQueue.delete(item.id);

                    console.log("Note update synced:", response.data);
                } catch (error) {
                    console.log("Update sync failed:", error);
                }
            }
            if (item.operation === "delete") {
                try{
                    await api.delete(`/notes/${note.serverId}`);

                    note.syncStatus = "synced";
                    await db.notes.put(note);
                    await db.syncQueue.delete(item.id);

                    console.log("Note delete synced:", note.serverId);
                }catch(error){
                    console.log("Delete sync failed:",error);
                }
            }
        }
    } finally {
        isSyncing = false;
    }
};

export default syncNotes;