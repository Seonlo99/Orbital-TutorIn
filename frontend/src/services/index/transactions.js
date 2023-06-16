import axios from "axios";
import { rootUrl } from "../../config/config";


export const getTransaction = async({tutorId, studentId})=>{
    try{
        // console.log(commentId)
        const {data} = await axios.get(`${rootUrl}/api/transactions`, { params: { tutorId, studentId }});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}


export const newTransaction = async({token, tutorId,studentId})=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const {data} = await axios.post(`${rootUrl}/api/transactions`, { tutorId, studentId}, config);
        return data;
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const deleteTransaction = async({token, transactionId, tutorId, studentId})=>{
    try{
        
        const {data} = await axios.delete(`${rootUrl}/api/transactions`, { params: { transactionId, tutorId, studentId }, headers: { Authorization: `Bearer ${token}` }});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}