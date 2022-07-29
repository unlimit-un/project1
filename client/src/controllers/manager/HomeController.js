import { axiosGet, ROOT_SERVER } from "../../functions/AxiosCustom";

export const getNotifyRepairPieChart = async () =>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getNotifyRepairPieChart?user_id=${user_id}`);
        
        return data;
      } catch (error) {
          console.error(error)
      }
}

export const getNotifyRepairBarChart = async () =>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getNotifyRepairBarChart?user_id=${user_id}`);
        
        return data;
    } catch (error) {
        console.error(error)
    }
}