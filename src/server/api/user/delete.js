import clientAxios from '../../clientAxios'
import React from 'react'
import { config } from '../../config.js';


export const deleteUser = async (id) => await clientAxios.delete(`/users/${id}`);