import axios from "axios";
import { rootUrl } from "../../config/config";

export const getAllPosts = async(curPage, search=null, sortBy="New", selectedTags)=>{
    try{
        const {data} = await axios.get(`${rootUrl}/api/posts`, { params: { page: curPage, search:search, sortBy:sortBy, selectedTags }});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const getSinglePost = async(uuid, userId=null)=>{
    try{
        // console.log(userId)
        const {data} = await axios.get(`${rootUrl}/api/posts/post`, { params: { slug: uuid, userId:userId }});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const newPost = async({title,content,token, selectedTags})=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const {data} = await axios.post(`${rootUrl}/api/posts`, {title,content, selectedTags}, config);
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const editPost = async({title,content,token, uuid, selectedTags})=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const {data} = await axios.patch(`${rootUrl}/api/posts`, {title,content,slug:uuid, selectedTags}, config);
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const deletePost = async({token, slug})=>{
    try{
        
        const {data} = await axios.delete(`${rootUrl}/api/posts`, { params: { slug: slug }, headers: { Authorization: `Bearer ${token}` }});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}