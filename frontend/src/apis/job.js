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

export const apiGetAcceptedByCompany = async(id) =>{
    const result =  await getData(`company/${id}/acceptedStudent`);
    return result;
}

export const apiGetStudentRequest =  async(id)=>{
    const result = await getData(`job/getByStudent/${id}`)
    return result;
}

export const apiAcceptJob =  async (id) =>{
    const result =  await postData('job/accept', {id});
    return result;
}
export const apiDenyJob =  async (id) =>{
    const result =  await postData('job/deny', {id});
    return result;
}