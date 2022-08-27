import { axiosGet, axiosPost, ROOT_SERVER } from "../../functions/AxiosCustom";
import Swal from 'sweetalert2'
import { DeleteFormSwal, DenyFormSwal, InsertFormSwal, InsertToastFormSwal } from "../../functions/Swal";

export const api_getLeaveTypeByManagerId = async () => {
    try {
        const {data:{user_id : manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getLeaveTypeByManagerId?manager_id=${manager_id}`);
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

export const api_getLeaveTypeById = async (leave_type_id) => {
    try {
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getLeaveTypeById?leave_type_id=${leave_type_id}`);
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
export const api_deleteLeaveType = async (formData) => {
    try {
        return DeleteFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/deleteLeaveType`, {...formData}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}
export const api_updateLeaveType = async (formData) => {
    try {
        const {data:{user_id : manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        return InsertFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/updateLeaveType`, {...formData, manager_id}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}
export const api_insertLeaveType = async (formData) => {
    try {
        const {data:{user_id : manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        return InsertToastFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/insertLeaveType`, {...formData, manager_id}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}