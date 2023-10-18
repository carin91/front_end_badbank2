import clientAxios from '../../clientAxios'
import React from 'react'
import { config } from '../../config.js';

// export const confirmNewUser = async token => await clientAxios(`/user/confirm-account/${token}`)
// export const confirmNewPassword = async token => await clientAxios(`/user/reset-password/${token}`)
export const getUserProfile = async () => {
  const response =  await clientAxios.get(`/users`);
  return response.data;
}
export const getAuthenticatedProfile = async (id) => await clientAxios.get(`/users/${id}`);

// export const loginDb = async (accessData) => {
//   const response =  await clientAxios.post(`/login`, accessData);
//   return response;
// }

export const loginDb = async (accessData) => {
  await clientAxios.post(`/login`, accessData)
};