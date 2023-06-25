import axios from "axios";
import { rootUrl } from "../../config/config";

export const addApplication = async({token, desc, slug, parent, replyUser})=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const {data} = await axios.post(`${rootUrl}/api/applications`, {desc, slug, parent, replyUser}, config);
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const getApplications = async({token})=>{
    try{
        const {data} = await axios.get(`${rootUrl}/api/applications`, { headers: { Authorization: `Bearer ${token}` } });
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}


export const editApplication = async({token, applicationId, accept})=>{
    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const {data} = await axios.patch(`${rootUrl}/api/applications`, {applicationId, accept}, config);
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}