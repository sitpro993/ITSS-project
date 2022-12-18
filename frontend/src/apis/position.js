import { getData, postData } from "../config/api"

export const getPositionByCompany =  async(id) => {
    const result = getData(`position/getByCompany/${id}`)
    return result;
}

export const registerJob = async(data) => {
     const result = postData(`position/registerJob`, data)
    return result;
}