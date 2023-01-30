import { getData, postData } from '../config/api'

export const getOccupation = async (accessToken, searchQuery) => {
  const result = await getData('occupation', accessToken, searchQuery)
  return result
}

export const getOccupationDetail = async (id) => {
  const result = await getData(`occupation/${id}`)
  return result
}

export const getRegistration = async (accessToken, searchQuery) => {
  const result = await getData('occupation/list', accessToken, searchQuery)
  return result
}

export const createOccupation = async (data) => {
  const result = await postData('occupation', data)
  return result
}
