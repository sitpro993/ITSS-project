import { getData } from "../config/api"

export const apiStudentRequestDetail = async( id,accessToken) =>{
    const result = await getData(`job/${id}/accept`, accessToken);
    return result
}