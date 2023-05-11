import User from "../models/User"

export const registerUser = async (req, res) => {
    try{
        const { username, name, email, password } = req.body;
        // console.log(req);
        let user = await User.findOne({ username });
        if(user){
            return res.status(400).json({message:"User have already registered"})
        }

        user = await User.create({
            username,
            name,
            email,
            password,
        });

        return res.status(201).json({
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            verified: user.verified,
            tutor: user.tutor,
            token: await user.generateJWT(),
        })

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

export const userLogin = async (req, res) => {
    try{
        const { username, password } = req.body;
        // console.log(req.body);
        let user = await User.findOne({ username });
        if (!user){
            return res.status(400).json({message:"User does not exist or invalid password."})
        }
        if(await user.verifyPassword(password)){
            return res.status(201).json({
                _id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                verified: user.verified,
                tutor: user.tutor,
                token: await user.generateJWT(),
            })
        }
        else{
            return res.status(400).json({message:"User does not exist or invalid password."})
        }
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}

export { registerUser, userLogin};