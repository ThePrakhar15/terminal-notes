import Note from "../models/Note.js";

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

export { getNotes } ;