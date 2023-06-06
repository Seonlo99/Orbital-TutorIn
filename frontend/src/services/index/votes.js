import axios from "axios";
import { rootUrl } from "../../config/config";

export const addVote = async({token,action,postSlug, commentSlug=null})=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        // console.log(postSlug)
        // console.log(action)
        // console.log(commentSlug)
        const {data} = await axios.post(`${rootUrl}/api/votes`, {action,postSlug,commentSlug}, config);
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const editVote = async({token,action,postSlug, commentSlug=null})=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const {data} = await axios.patch(`${rootUrl}/api/votes`, {action,postSlug,commentSlug}, config);
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const deleteVote = async({token,postSlug, commentSlug=null})=>{
    try{
        
        const {data} = await axios.delete(`${rootUrl}/api/votes`, { params: { postSlug, commentSlug }, headers: { Authorization: `Bearer ${token}` }});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}