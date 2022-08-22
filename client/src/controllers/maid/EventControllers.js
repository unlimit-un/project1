import {axiosGet, axiosPost, ROOT_SERVER} from '../../functions/AxiosCustom';
import swal from 'sweetalert2'
import { icon } from '@fortawesome/fontawesome-svg-core';
import Swal from 'sweetalert2';

export const geteventData = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/geteventData?tm.maid_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
    }
 }
 export const geteventDataStatus = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/geteventDataStatus?tm.maid_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
    }
 }
 export const getSpacialEventByMaidId = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/maid/getSpacialEventByMaidId?maid_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
    }
 }
