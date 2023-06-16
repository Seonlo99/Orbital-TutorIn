import Transaction from "../models/Transaction.js"

import {getReviewByUserAndTransactionId} from "./reviewControllers.js"


const getTransaction = async (req, res) => {
    try{
        const {tutorId, studentId} = req.query
        // console.log(parentId)
        const transaction = await Transaction.findOne({tutorId, studentId}).sort({_id:-1})
        // console.log(transaction)
        if(transaction===null || transaction.transactionCompleted || transaction.transactionCancelled){ //return null if transaction completed
            return res.json(null)
        }

        return res.json({transaction}) //return pending transaction

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const addTransaction = async (req, res) => {
    try{
        const { tutorId,studentId } = req.body;
        if(!req.user._id.equals(studentId)){
            return res.status(500).json({message:"Invalid token/student"})
        }
        const transaction = await Transaction.create({
            studentId,
            tutorId,
            studentAccepted: true,
        });

        return res.json({transaction})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const cancelTransaction = async (req, res) => { 
    try{
        const { transactionId, studentId, tutorId } = req.query;

        let transaction = await Transaction.findOne({_id:transactionId});
        // console.log(post)
        if(!transaction){
            return res.status(404).json({message:"Unable to find transaction!"})
        }
        if(! (transaction.studentId.equals(req.user._id) ||  transaction.tutorId.equals(req.user._id) )){ //check if the user is owner of the post
            return res.status(404).json({message:"No rights to cancel transaction!"})
        }
        transaction = await Transaction.findOneAndUpdate({_id:transactionId}, {transactionCancelled:true});

        return res.json({transaction})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const getSelectedTransactions = async (req, res) => {
    try{
        const {selected, role} = req.query
        
        const userId = req.user._id
        let filter = {}
        // console.log(role)
        if(role==="true"){ //tutor
            filter={tutorId:userId}
        }
        else{ //student
            filter={studentId:userId}
        }

        if(selected==="Pending"){
            filter={...filter, transactionCompleted:false, transactionCancelled:false, tutorAccepted:null}
        }
        else if(selected==="Progress"){
            filter={...filter, transactionCompleted:false, transactionCancelled:false, tutorAccepted:true}
        }
        else if(selected==="Completed"){
            filter={...filter, $or:[{transactionCompleted:true}, {transactionCancelled:true}]}
        }
        // console.log(filter)
        
        let transaction = await Transaction.find(filter).sort({_id:-1}).populate([{path:"studentId", select:["name","tutor"]}, {path:"tutorId", select:["name","tutor"]}])

        if(selected==="Completed"){
            transaction = await Promise.all(
                transaction.map(async (single) => {
                  const reviewed = await getReviewByUserAndTransactionId({transactionId:single._id, reviewerId:userId});
                  return { ...single._doc, reviewed: reviewed };
                })
            );
        }

        return res.json({transaction}) //return pending transaction

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}

const modifyTransaction = async (req, res) => {
    try{
        const { transactionId, tutorId, studentId, action=null } = req.body;

        let transaction = await Transaction.findOne({_id:transactionId});
        if(!transaction){
            return res.status(404).json({message:"Unable to find transaction!"})
        }
        if(action==="Accept"|| action==="Reject"){ //tutor actions (Accept / Reject service request)
            if(!transaction.tutorId.equals(req.user._id)){ //check if the user is tutor of the transaction
                return res.status(404).json({message:"Not the Tutor!"})
            }
            
            if(action==="Accept"){
                transaction = await Transaction.findOneAndUpdate({_id:transactionId}, {tutorAccepted:true});
            }
            else if(action==="Reject"){
                transaction = await Transaction.findOneAndUpdate({_id:transactionId}, {tutorAccepted:false, transactionCancelled:true});
            }
            
        }
        else{ //student actions (Completed service)
            if(!transaction.studentId.equals(req.user._id)){ //check if the user is student of the transaction
                return res.status(404).json({message:"Not the Student!"})
            }
            if(action==="Completed"){
                transaction = await Transaction.findOneAndUpdate({_id:transactionId}, {transactionCompleted:true});
            }
        }

        return res.json({transaction})

    } catch (error){
        return res.status(500).json({message:error.message})
    }
}


export {getTransaction, addTransaction, cancelTransaction, getSelectedTransactions, modifyTransaction}