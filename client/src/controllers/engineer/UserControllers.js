import { Axios } from 'axios'
import React from 'react'
import { axiosGet, ROOT_SERVER } from '../../functions/AxiosCustom';

export const getUserData = async() => {
    try {
        const {data:{user_id}} = await  axiosGet (`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/getUserData?user_id=${user_id}`);
        
        return data;
       } catch (error) {
        console.error(error)
        
       }
  
}
