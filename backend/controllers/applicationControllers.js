import Application from "../models/Application.js"

import User from "../models/User.js";


const addApplication = async (req, res) => {
    try{
        const { pdfUrl  } = req.body;

        const application = await Application.create({
            tutorId:req.user._id,
            pdfUrl:pdfUrl,
        });

        return res.json({application})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const getApplications = async (req, res) => {
    try{
        let user = await User.findOne({_id:req.user._id})
        console.log(user)
        if(!user.isAdmin){
            return res.status(401).json({message:"Unauthorised"})
        }
        
        let applications = await Application.find({approved:null}).populate({
            path:"tutorId",
            select: ['username']
        },)

        return res.json({applications})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}


const editApplication = async (req, res) => {
    try{
        const { accept, applicationId  } = req.body;
        
        let user = await User.findOne({_id:req.user._id})
        if(!user.isAdmin){
            return res.status(401).json({message:"Unauthorised"})
        }

        let application = await Application.find({_id:applicationId})
        if(!application){
            return res.status(404).json({message:"No application found"})
        }


        application = await Application.findOneAndUpdate({_id:applicationId}, {approved:accept});

        return res.json({application})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}



export {addApplication, getApplications, editApplication};