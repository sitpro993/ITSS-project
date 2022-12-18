import { getData, postData } from "../config/api"

export const apiStudentRequestDetail = async( id,accessToken) =>{
    const result = await getData(`job/${id}/accept`, accessToken);
    return result
}

export const apiApplyInternship = async( data ,accessToken) =>{
    const result = await postData(`job/registerJob`, data, accessToken);
    return result
}

export const apiGetListJobByCompany = async(id) =>{
    const result =  await getData(`company/${id}/registeredStudent`);
    return result;
}