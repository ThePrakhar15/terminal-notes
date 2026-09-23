import Dexie from "dexie";
const db = new Dexie("TerminalNotesDB");

db.version(1).stores({
    notes: "id, user, updatedAt, syncStatus"
});

export default db;