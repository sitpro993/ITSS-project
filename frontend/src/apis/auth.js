import { postData } from "../config/api";

export const apiLogin = async (post) => {
  const result = await postData("users/login", post);
  return result;
};

export const apiRegister = async (post) => {
  const result = await postData("users/register", post);
  return result;
};