import React from 'react'
import { axiosGet, axiosPost } from './AxiosCustom'
const ROOT_SERVER =`http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}`;
export const createFullCalendar = async (data) => {
    try {
        const res = await axiosPost(`${ROOT_SERVER}/api/manager/create_full_calendar`,data)
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}

export const getFullCalendar = async () => {
    try {
        const res = await axiosGet(`${ROOT_SERVER}/api/manager/full_calendar`)
        if (res.status === 200) {
            return res.data
        }
    } catch (err) {
        console.log(err);
    }
}
