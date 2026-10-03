import Dexie from "dexie";
const db = new Dexie("TerminalNotesDB");

db.version(2).stores({
    notes: "id, user, serverId, updatedAt, syncStatus",
    syncQueue: "++id , noteId , operation , createdAt"
});

export default db;