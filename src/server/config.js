
import React from "react"

const token = localStorage.getItem('token')

export const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
    }
}