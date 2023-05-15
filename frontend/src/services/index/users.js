import axios from "axios";

export const userLogin = async({username,password})=>{
    try{
        const {data} = await axios.post('/api/users/login', {username,password});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}

export const userRegister = async({username,fullname,email,password, isTutor})=>{
    try{
        const {data} = await axios.post('/api/users/register', {username,fullname,email,password, isTutor});
        // console.log({username,fullname,email,password});
        return data;
        
    } catch(error){
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message)
    }
}