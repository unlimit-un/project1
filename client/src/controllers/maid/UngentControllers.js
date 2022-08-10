import {axiosGet, axiosPost, ROOT_SERVER} from '../../functions/AxiosCustom';
import swal from 'sweetalert2'
import { icon } from '@fortawesome/fontawesome-svg-core';
import Swal from 'sweetalert2';

export const geturgentData = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/geturgentData?maid_instead_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
    }

 }
 export const Updateurgent = async (formdata)=>{
    try {
        console.log(formdata);
        return Swal.fire({
            title: 'ต้องการอัพเดทข้อมูลหรือไม่',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            denyButtonText: 'ไม่ใช' ,
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosPost(`${ROOT_SERVER}/api/maid/Updateurgent`,{...formdata});
                await Swal.fire({
                    title: "สำเร็จ",
                    icon: "success",
                    text: "อัพเดทข้อมูลสำเร็จ"
                })
                return true
            }else{
                return false
            }
          })
    } catch (error) {
        
    }

 }