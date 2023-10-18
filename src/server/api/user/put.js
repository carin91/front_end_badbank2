import clientAxios from '../../clientAxios'
import React from 'react'
import { config } from '../../config.js';

// export const confirmNewUser = async token => await clientAxios(`/user/confirm-account/${token}`)
// export const confirmNewPassword = async token => await clientAxios(`/user/reset-password/${token}`)
export const putUser = async (id, dataToPut) => await clientAxios.put(`/users/${id}`, dataToPut);