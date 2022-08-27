import { axiosGet, axiosPost, ROOT_SERVER } from "../../functions/AxiosCustom";
import Swal from 'sweetalert2'
import { DeleteFormSwal, DenyFormSwal, InsertFormSwal, InsertToastFormSwal } from "../../functions/Swal";

export const api_getLeaveByManagerId = async () => {
    try {
        const {data:{user_id : manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getLeaveByManagerId?manager_id=${manager_id}`);
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

export const api_getLeaveById = async (leave_id) => {
    try {
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getLeaveById?leave_id=${leave_id}`);
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

export const api_getLeaveByManagerIdStatusWaiting = async () => {
    try {
        const {data:{user_id : manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getLeaveByManagerIdStatusWaiting?manager_id=${manager_id}`);
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

export const api_getLeaveByManagerIdStatusConsidered = async () => {
    try {
        const {data:{user_id : manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getLeaveByManagerIdStatusConsidered?manager_id=${manager_id}`);
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

export const api_getTotalLeaveByManagerId = async () => {
    try {
        const {data:{user_id : manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getTotalLeaveByManagerId?manager_id=${manager_id}`);
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

export const api_getTotalLeaveByManagerIdGroupByType = async () => {
    try {
        const {data:{user_id : manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getTotalLeaveByManagerIdGroupByType?manager_id=${manager_id}`);
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

export const api_updateLeaveToConsidered = async (formData) => {
    try {
        return InsertFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/updateLeaveToConsidered`, {...formData}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}

export const api_updateLeave = async (formData) => {
    try {
        return InsertFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/updateLeave`, {...formData}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}

export const api_deleteLeave = async (formData) => {
    try {
        return DeleteFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/deleteLeave`, {...formData}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}