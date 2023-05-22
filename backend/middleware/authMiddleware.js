import {verify} from "jsonwebtoken"
import User from "../models/User.js"

export const authChecker = async (req,res, next) =>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            const token = req.headers.authorization.split(" ")[1];
            const {id} = verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(id).select("-password")
            next();
        } catch(error){
            console.log("Not authorised, token error");
            console.log(error.message);
            return res.status(401).json({message: "Not authorised"});
        }
    }
    else{
        console.log("Not authorised, no token found");
        return res.status(401).json({message: "Not authorised"});
    }
}