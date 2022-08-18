import {axiosGet, axiosPost, ROOT_SERVER} from '../../functions/AxiosCustom';
import swal from 'sweetalert2'
import { icon } from '@fortawesome/fontawesome-svg-core';
import Swal from 'sweetalert2';

export const getworktData = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/getworktData?maid_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
    }
 }
 export const getworktDataComplete = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/getworktDataComplete?maid_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
    }
 }
 export const insertMaidDutyCheck = async (formData)=>{
    try {
        const {data} = await axiosPost(`${ROOT_SERVER}/api/maid/insertMaidDutyCheck`, {...formData});
        if (data) {
            return Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ'
            }).then(()=>{
                return true
            })
        }
        return data;
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}