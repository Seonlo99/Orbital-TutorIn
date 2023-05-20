import axios from "axios";

export const newComment = async({token, desc, slug, parent, replyUser})=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const {data} = await axios.post('/api/comments', {desc, slug, parent, replyUser}, config);
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
        console.log(commentId)
        const {data} = await axios.get('/api/comments', { params: { slug: uuid, parentId: commentId }});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}