import moongoose from "mongoose";

const noteSchema = new moongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    content:{
        type:String,
        required:true,
    },
    user:{
        type: mongoose.Schema.Type.ObjectId,
        ref:"User",
        required: true,
    },
},
{
timestamps:true,
    }
    );

    const Note = moongoose.model("Note",noteSchema);
    export default Note;