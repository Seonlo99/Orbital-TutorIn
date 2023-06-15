import axios from "axios";
import { rootUrl } from "../../config/config";

export const addReview = async({token, transactionId, reviewerId, revieweeId, rating, review})=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const {data} = await axios.post(`${rootUrl}/api/reviews`, { transactionId, reviewerId, revieweeId, rating, review}, config);
        return data;
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}