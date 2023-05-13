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
