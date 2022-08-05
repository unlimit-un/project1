import {axiosGet, ROOT_SERVER} from '../../functions/AxiosCustom';

export const getleavepiechart = async ()=>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/getleavepiechart?user_id= ${user_id}`);
    
    return data;
    } catch (error) {
        
      }
 }