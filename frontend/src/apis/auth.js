import { getData, postData } from "../config/api";

export const apiLogin = async (post) => {
  const result = await postData("users/login", post);
  return result;
};

export const apiGetUserInfo = async (accessToken)=>{
  const result = await getData("users/accessToken",accessToken);
  return result;
} 

export const apiStudentRegister = async (post) => {
  const result = await postData("users/register", post);
  return result;
};
