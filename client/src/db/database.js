import Dexie from "dexie";
const db = new Dexie("TerminalNotesDB");

db.version(1).stores({
    notes: "id, user, updatedAt, syncStatus",
    syncQueue: "++id , noteId , operation , createdAt"
});

export default db;