import {axiosGet, axiosPost, ROOT_SERVER} from '../../functions/AxiosCustom';
import swal from 'sweetalert2'
import { icon } from '@fortawesome/fontawesome-svg-core';
import Swal from 'sweetalert2';

export const GetRepairData = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/GetRepairData?maid_id= ${user_id}`);
    
    return data;
    } catch (error) {
        console.log(error);
    }
}
export const GetRepairLocation = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/getrepairDatalocation?maid_id= ${user_id}`);
    
    return data;
    } catch (error) {
        console.log(error);
        
    }
}
export const getroomBylocationId = async (location_id)=>{
    try {
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/getroomBylocationId?location_id= ${location_id}`);
    return data;
    } catch (error) {
        console.log(error); 
    }
}
export const insertRepair = async (formdata)=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const result = await axiosPost(`${ROOT_SERVER}/api/maid/insertRepair`,{...formdata,maid_id:user_id});
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
export const UpdateRepair = async (formdata)=>{
    try {
        // console.log(formdata);
        return Swal.fire({
            title: 'ต้องการลบข้อมูลหรือไม่',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            denyButtonText: 'ไม่ใช' ,
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosPost(`${ROOT_SERVER}/api/maid/UpdateRepair`,{...formdata});
                await Swal.fire({
                    title: "สำเร็จ",
                    icon: "success",
                    text: "ลบข้อมูลสำเร็จ"
                })
                return true
            }else{
                return false
            }
          })
    } catch (error) {
        
    }

 }
 export const getrepairDataById = async (notify_repair_id)=>{
    try {
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/getrepairDataById?notify_repair_id= ${notify_repair_id}`);
    return data;
    } catch (error) {
        console.log(error); 
    }
}