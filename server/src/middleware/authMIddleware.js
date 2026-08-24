import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async(req, res, next) =>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const token = authHeader.replace("Bearer ","");

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

if (!user) {
return res.status(401).json({
    message:"unauthorized",
});
}
    
req.user = user;

next();
    }catch(error){
return res.status(401).json({
    message: "Internal Server Error",
});
    }
}

export default authMiddleware;