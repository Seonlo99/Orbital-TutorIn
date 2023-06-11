import axios from "axios";
import { rootUrl } from "../../config/config";

export const getAllTags = async()=>{
    try{
        const {data} = await axios.get(`${rootUrl}/api/tags`);
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}
