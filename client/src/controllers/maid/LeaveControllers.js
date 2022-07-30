import {axiosGet, ROOT_SERVER} from '../../functions/AxiosCustom';

export const GetLeaveData = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/GetLeaveData?user_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
    }

 }
export const getleaveDataByid = async(leave_id)=>{
    try {
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/getleaveDataByid?leave_id= ${leave_id}`);
    return data;
    } catch (error) {
        
    }
}

 
 export const delectleaveData = async ()=>{
  
}