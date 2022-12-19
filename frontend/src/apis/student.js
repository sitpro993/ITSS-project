import { getData, postData, putData } from '../config/api';

export const getStudentProfile = async () => {
    const accessToken = `Bearer ${localStorage.getItem('accessToken')}`;
    const result = await getData(`student/profile`, accessToken)
    return result
}

export const updateStudentProfile= async (data) => {
    const accessToken = `Bearer ${localStorage.getItem('accessToken')}`;
    const userID = data.userId
    const result = await putData(`student/${userID}`,data,accessToken )
    return result 
}