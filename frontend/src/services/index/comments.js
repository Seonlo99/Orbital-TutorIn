import axios from "axios";
import { rootUrl } from "../../config/config";

export const newComment = async({token, desc, slug, parent, replyUser})=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const {data} = await axios.post(`${rootUrl}/api/comments`, {desc, slug, parent, replyUser}, config);
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const getComments = async(uuid, commentId=null)=>{
    try{
        // console.log(commentId)
        const {data} = await axios.get(`${rootUrl}/api/comments`, { params: { slug: uuid, parentId: commentId }});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}


export const editComment = async({desc,token,id})=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const {data} = await axios.patch(`${rootUrl}/api/comments`, {desc,id}, config);
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const deleteComment = async({token, id})=>{
    try{
        
        const {data} = await axios.delete(`${rootUrl}/api/comments`, { params: { id: id }, headers: { Authorization: `Bearer ${token}` }});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}