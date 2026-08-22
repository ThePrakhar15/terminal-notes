import dotenv from'dotenv';
import mongoose from "mongoose";

import app from "./app.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then( () =>{
    console.log("MongoDB connected");

app.listen(process.env.PORT, () =>{
    console.log(`Server running on port ${process.env.PORT}`);
})
})
.catch((err) =>{
    console.error("MongoDB connection Failed:");
    console.error(err);
});