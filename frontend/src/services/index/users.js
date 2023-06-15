import axios from "axios";
import { rootUrl } from "../../config/config";

export const userLogin = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${rootUrl}/api/users/login`, {
      username,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const userRegister = async ({
  username,
  fullname,
  email,
  password,
  isTutor,
}) => {
  try {
    const { data } = await axios.post(`${rootUrl}/api/users/register`, {
      username,
      fullname,
      email,
      password,
      isTutor,
    });
    // console.log({username,fullname,email,password});
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const editProfile = async ({ _id, fullname, email, password }) => {
  try {
    const { data } = await axios.put(`${rootUrl}/api/users/updateProfile`, {
      _id,
      fullname,
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const UpdateProfilePicture = async ({ formData }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `${rootUrl}/api/users/updateProfilePicture`,
      formData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getUserProfile = async(id)=>{
  try{
      const {data} = await axios.get(`${rootUrl}/api/users`, { params: { userId:id }});
      return data;
      
  } catch(error){
      if(error.response && error.response.data.message){
          throw new Error(error.response.data.message);
      }
      throw new Error(error.message)
  }
}