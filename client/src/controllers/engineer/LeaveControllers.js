import { axiosGet, ROOT_SERVER } from "../../functions/AxiosCustom";

export const getLeaveData = async () => {
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/getLeaveData?user_id=${user_id}`);
        
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const getLeaveDataById = async (leave_id) =>{
    try {
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/getLeaveDataById?leave_id=${leave_id}`);

        return data;
    } catch (error) {
        console.error(error)
    }
}

export const deleteLeaveData = async () =>{

}
