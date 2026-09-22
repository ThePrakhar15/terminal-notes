import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minLength: 1,
       
    },
    content:{
        type:String,
        required:true,
        minLength:1 ,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    version:{
        type: Number,
        default: 1,
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
    lastModifiedBy:{
        type: String,
        default: "server",
    }
},
{
timestamps:true,
    }
    );

    const Note = mongoose.model("Note",noteSchema);
    export default Note;