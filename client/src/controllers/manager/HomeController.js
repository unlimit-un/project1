import { api_getTotalEngineerByManagerId } from "../../api/engineer";
import { api_getTotalMaidByManagerId } from "../../api/maid";
import { api_getNotifyRepairByManagerIdStatusWaiting, api_getTotalNotifyRepairByManagerId, api_getTotalNotifyRepairByManagerIdAndStatus } from "../../api/notify_repair";
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
        let arr =[];
        for (let i = 1; i <= 12; i++) {
            const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getNotifyRepairBarChart?user_id=${user_id}&month_number=${i}`);
            arr.push(data)
        }
        
        return arr;
    } catch (error) {
        console.error(error)
    }
}

export const getLeaveBarChart = async () =>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        let arr =[];
        for (let i = 1; i <= 12; i++) {
            const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getLeaveBarChart?manager_id=${user_id}&month_number=${i}`);
            arr.push(data)
        }
        return arr;
    } catch (error) {
        console.error(error)
    }
}

export const getLeaveRoleMaidBarChart = async () =>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        let arr =[];
        for (let i = 1; i <= 12; i++) {
            const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getLeaveRoleMaidBarChart?manager_id=${user_id}&month_number=${i}`);
            arr.push(data)
        }
        return arr;
    } catch (error) {
        console.error(error)
    }
}

export const getLeaveRoleEngineerBarChart = async () =>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        let arr =[];
        for (let i = 1; i <= 12; i++) {
            const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getLeaveRoleEngineerBarChart?manager_id=${user_id}&month_number=${i}`);
            arr.push(data)
        }
        return arr;
    } catch (error) {
        console.error(error)
    }
}

export const getOrderMaterialTableDashboard = async () =>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getOrderMaterialTableDashboard?manager_id=${user_id}`);
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const getCountMaidByManagerId = async () =>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getCountMaidByManagerId?manager_id=${user_id}`);
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const getCountEngineerByManagerId = async () =>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getCountEngineerByManagerId?manager_id=${user_id}`);
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const getTotalNotifyRepairByManagerId = async () => await api_getTotalNotifyRepairByManagerId();
export const getTotalEngineerByManagerId = async () => await api_getTotalEngineerByManagerId();
export const getTotalMaidByManagerId = async () => await api_getTotalMaidByManagerId();
export const getTotalNotifyRepairByManagerIdAndStatus = async status => await api_getTotalNotifyRepairByManagerIdAndStatus(status);
export const getNotifyRepairByManagerIdStatusWaiting = async status => await api_getNotifyRepairByManagerIdStatusWaiting(status);