import Note from "../models/Note.js";
const createNote = async (req , res) =>{
    try{
const { title , content} = req.body;
const note = await Note.create({
    title,
    content,
    user: req.user._id,
});
    return res.status(201).json({
        message: "Note created succesfully",
        note,
    });

    }catch(error){
        return res.status(500).json({
            message: "Internal Server error",
        });
    }
};

export {createNote};