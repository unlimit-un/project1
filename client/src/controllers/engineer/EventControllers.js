import {axiosGet, ROOT_SERVER} from '../../functions/AxiosCustom';

export const getSpacialEventByEngineerId = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/getSpacialEventByEngineerId?engineer_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
      }
 }
 export const geteventData = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/geteventData?engineer_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
      }
 }
 export const geteventDataStatus = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/geteventDataStatus?tm.engineer_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
    }
 }

 
