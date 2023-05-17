import axios from "axios";

export const getAllPosts = async(curPage)=>{
    try{
        const {data} = await axios.get('/api/posts', { params: { page: curPage }});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const getSinglePost = async(uuid)=>{
    try{
        const {data} = await axios.get('/api/posts/post', { params: { slug: uuid }});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const newPost = async({title,content,token})=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const {data} = await axios.post('/api/posts', {title,content}, config);
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}