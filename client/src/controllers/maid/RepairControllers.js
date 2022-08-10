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
        
    }
}
export const GetRepairLocation = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/getrepairDatalocation?maid_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
    }
}