import User from "../models/User.js";
import bcrypt from "bcrypt";

const registerUser = async( req, res) =>{
try{
    const {name, email, password} = req.body;
const existingUser = await User.findOne({email});

if (existingUser){
    return res.status(400).json({
        message: "Email already exists",
    });
}

const hashedPassword = await bcrypt.hash(password,10);

const user = await User.create({
    name , email, password: hashedPassword,
});

return res.status(201).json({
    message: "user registered succesfully",
    user: {
        id:user._id,
        name: user.name,
        email: user.email,
    },
});
} catch(error){
    return res.status(500).json({
        message:"Internal Server Error",
    });
}

};

export default registerUser; 