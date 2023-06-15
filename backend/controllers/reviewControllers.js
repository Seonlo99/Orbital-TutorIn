import Review from "../models/Review.js"
import Transaction from "../models/Transaction.js"

const addReview = async (req, res) => {
    try {
        const { transactionId, reviewerId, revieweeId, rating, review } = req.body;
        if(rating<0 || rating>5){
            rating=5
        }
        const transaction = Transaction.find({id:transactionId})
        if(!transaction){
            return res.status(404).json({ message: "Transaction not found!" }); 
        }
        if( transaction.studentId.equals(revieweeId) && transaction.tutorId.equals(reviewerId)){ // tutor review student
            if(transaction.tutorReviewId===null){ //ensure tutor haven't review before
                const reviewCreated = await Review.create({
                    reviewerId,
                    revieweeId,
                    stars:rating,
                    reviewComment:review
                });
                Transaction.findOneAndUpdate({_id:transactionId}, {tutorReviewId:reviewCreated._id});
            }
            else{
                return res.status(404).json({ message: "Tutor already reviewed!" });
            }
        }
        else if( transaction.studentId.equals(reviewerId) && transaction.tutorId.equals(revieweeId)){ // student review tutor
            if(transaction.studentReviewId===null){ //ensure student haven't review before
                const reviewCreated = await Review.create({
                    reviewerId,
                    revieweeId,
                    stars:rating,
                    reviewComment:review
                });
                Transaction.findOneAndUpdate({_id:transactionId}, {studentReviewId:reviewCreated._id});
            }
            else{
                return res.status(404).json({ message: "Student already reviewed!" });
            }
        }
        else{
            return res.status(404).json({ message: "Invalid Student / Tutor" });
        }
  
      return res.json();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };



export {addReview}