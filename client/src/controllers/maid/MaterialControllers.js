import {axiosGet, axiosPost, ROOT_SERVER} from '../../functions/AxiosCustom';
import swal from 'sweetalert2'
import { icon } from '@fortawesome/fontawesome-svg-core';
import Swal from 'sweetalert2';

export const GetMaterialData = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/GetMaterialData?maid_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
    }

 }
 export const getmaterialofUser = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/getmaterialofUser?maid_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
    }
 }
 export const getmaterialDataById = async (order_id)=>{
    try {
        
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/getmaterialDataById?order_id= ${order_id}`);
    
    return data;
    } catch (error) {
        
    }
 }
 export const InsertOrderMaterial = async (formData) => {
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosPost(`${ROOT_SERVER}/api/maid/InsertOrderMaterial`,{...formData,maid_id:user_id});
    
    return data;
    } catch (error) {
        
    }
 }
 export const deleteOrderMaterial = async (formData) => {
    try {
        return Swal.fire({
            title: 'ต้องการลบข้อมูลหรือไม่',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            denyButtonText: 'ไม่ใช' ,
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosPost(`${ROOT_SERVER}/api/maid/deleteOrderMaterial`,{...formData});
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