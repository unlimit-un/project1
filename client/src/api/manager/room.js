import { axiosGet, axiosPost, ROOT_SERVER } from "../../functions/AxiosCustom";
import Swal from 'sweetalert2'
import { DeleteFormSwal, DenyFormSwal, InsertFormSwal, InsertToastFormSwal } from "../../functions/Swal";

export const api_getRoomByLocationId = async (location_id) => {
    try {
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getRoomByLocationId?location_id=${location_id}`);
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

export const api_getRoomById = async (room_id) => {
    try {
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getRoomById?room_id=${room_id}`);
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

export const api_updateRoom = async (formData) => {
    try {
        return InsertFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/updateRoom`, {...formData}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}

export const api_insertRoom = async (formData) => {
    try {
        const {data:{user_id : manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        return InsertToastFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/insertRoom`, {...formData}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}

export const api_deleteRoom = async (formData) => {
    try {
        return DeleteFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/deleteRoom`, {...formData}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}