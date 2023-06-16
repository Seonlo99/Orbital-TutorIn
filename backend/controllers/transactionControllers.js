import Transaction from "../models/Transaction.js"


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



export {getTransaction, addTransaction, cancelTransaction}