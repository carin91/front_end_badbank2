import axios from 'axios'
import React from 'react'
// import dotenv from "dotenv"

// import dotenv from "dotenv"

//  dotenv.config();
// require('dotenv').config()
// // const clientAxios = axios.create({
// //     baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
// // })

const clientAxios = axios.create({
    baseURL: `http://localhost:4000/api`
})

export default clientAxios;