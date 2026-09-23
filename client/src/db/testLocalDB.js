import db from "./database";

const testLocalDB = async () =>{
    await db.notes.put({
        id:"test-note-1",
        user: "test-user",
        title: "Local Test",
        content: "Stored locally",
        updateAt: new Date().toISOString(),
        syncStatus: "pending",
    });

    const note = await db.notes.gey("test-note-1");
    console.log("Local note:", note);
};

testLocalDB();