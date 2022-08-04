import {axiosGet, axiosPost, ROOT_SERVER} from '../../functions/AxiosCustom';
import swal from 'sweetalert2'
import { icon } from '@fortawesome/fontawesome-svg-core';

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
export const insertLeave = async (fromdata)=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const result = await axiosPost(`${ROOT_SERVER}/api/maid/insertLeave`,{...fromdata,user_id});
        await swal.fire({
            title:"สำเร็จ",
            icon:"success",
            text:"บันทึกข้อมูลสำเร็จ"
        })
    // return data;
    } catch (error) {
        await swal.fire({
            title:"ผิดพลาด",
            icon:"error",
            text:error.response.data
        })
        
    }
}
 export const delectleaveData = async ()=>{
  
}
export const getLeaveType = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/getLeaveType?maid_id= ${user_id}`);
    
    return data;
    } catch (error) {
     
        
    }

 }
