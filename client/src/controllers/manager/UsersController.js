import React from 'react'
import { axiosGet, axiosGetImage, ROOT_SERVER } from '../../functions/AxiosCustom';
export const getUserData = async () => {
  try {
    const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
    const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getUserData?user_id=${user_id}`);
    
    return data;
  } catch (error) {
      console.error(error)
  }

}

export const getImageOfUser = async () => {
  try {
    const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
    const response = await axiosGetImage(`${ROOT_SERVER}/api/manager/getImageOfUser?user_id=${user_id}`);
    const imageObjectURL = URL.createObjectURL(response.data);
    return imageObjectURL;
  } catch (error) {
      console.error(error)
  }

}
