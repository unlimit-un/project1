import { axiosGet, axiosPost, ROOT_SERVER } from "../../functions/AxiosCustom";
import Swal from "sweetalert2";

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

export const getLeaveType = async () => {
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/getLeaveType?engineer_id=${user_id}`);
        
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const insertLeave = async (formData) =>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const result = await axiosPost(`${ROOT_SERVER}/api/engineer/insertLeave`,{...formData, user_id});
        await Swal.fire({
            title: "สำเร็จ",
            icon: "success",
            text: "บันทึกข้อมูลเสร็จสิ้น"
        })
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: error.response.data
        })
    }
}

export const deleteLeaveData = async () =>{

}
