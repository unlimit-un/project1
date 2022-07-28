import React from 'react'
import {axiosGet, ROOT_SERVER} from '../../functions/AxiosCustom';

export const GetUserData = async () => {
  try {
    const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
    const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/getUserData?user_id= ${user_id}`);

    return data;
  } catch (error) {
    
  }
}
