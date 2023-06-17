import Review from "../models/Review.js"
import Transaction from "../models/Transaction.js"

const addReview = async (req, res) => {
    try {
        const { transactionId, reviewerId, revieweeId, rating, review } = req.body;
        if(rating<0 || rating>5){
            rating=5
        }
        const transaction = await Transaction.find({id:transactionId})
        if(!transaction){
            return res.status(404).json({ message: "Transaction not found!" }); 
        }
        if(!transaction.transactionCompleted){
            return res.status(404).json({ message: "Transaction not completed yet!" }); 
        }

        const checkReview = await Review.findOne({transactionId, reviewerId,revieweeId})
        if(checkReview){
            return res.status(404).json({ message: "Already reviewed before!" }); 
        }

        if( !(transaction.studentId.equals(revieweeId) && transaction.tutorId.equals(reviewerId))
            && !(transaction.studentId.equals(reviewerId) && transaction.tutorId.equals(revieweeId))
        ){
            return res.status(404).json({ message: "Invalid Student / Tutor!" });  
        }

        const reviewCreated = await Review.create({
            transactionId,
            reviewerId,
            revieweeId,
            stars:rating,
            reviewComment:review
        });
  
      return res.json({reviewCreated});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};


const getReviewByUserAndTransactionId = async ({transactionId, reviewerId}) => {
    const review = await Review.findOne({transactionId, reviewerId}) //check if user reviewed before
    // console.log(review)
    if(review){
        return true
    }
    else{
        return false
    }
};




export {addReview, getReviewByUserAndTransactionId}