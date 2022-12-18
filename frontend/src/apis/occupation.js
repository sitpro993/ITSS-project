import { getData, postData } from '../config/api';

export const getOccupation = async (accessToken) => {
    const result = await getData("occupation", accessToken)
    return result
}

export const createOccupation = async (data) => {
    const result = await postData('occupation', data )
    return result 
}