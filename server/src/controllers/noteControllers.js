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

const getNotes = async (req , res) =>{
    try{
const notes = await Note.find({
    user: req.user._id,
}) 
    return res.status(200).json({
        notes,
    })

    } catch(error){
        return res.status(500).json({
            message:"Internal server error",
        });
    }
}
const updateNote = async (req , res) =>{
    try{
     const {title , content } = req.body;

     const noteId = req.params.id;

     const note = await Note.findById(noteId);
     
     if(!note){
        return res.status(404).json({
            message:"Note not found",
        })
     }
     
        if(note.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"Forbidden",
            })
        }

        note.title = title;
        note.content = content;

        await note.save();

        return res.status(200).json({
            message: "Note updated successfully",
            note,
        });

    } catch(error){
        return res.status(500).json({
            message:"Internal Server Error",
        });
    }
};
export { createNote , getNotes , updateNote };