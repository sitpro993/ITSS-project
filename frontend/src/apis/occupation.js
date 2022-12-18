import { getData } from '../config/api';

export const getOccupation = async (accessToken) => {
    const result = await getData("occupation", accessToken)
    return result
}