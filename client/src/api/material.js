import { axiosGet, axiosPost, ROOT_SERVER } from "../functions/AxiosCustom";
import Swal from 'sweetalert2'
import { DeleteFormSwal, InsertFormSwal, InsertToastFormSwal } from "../functions/Swal";

export const api_getMaterialByManagerId = async () => {
    try {
        const {data:{user_id : manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getMaterialByManagerId?manager_id=${manager_id}`);
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

export const api_getMaterialById = async (material_id) => {
    try {
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getMaterialById?material_id=${material_id}`);
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

export const api_insertMaterial = async (formData) =>{
    try {
        const {data:{user_id : manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        return InsertToastFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/insertMaterial`, {...formData, manager_id}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}

export const api_deleteMaterial = async (formData) =>{
    try {
        return DeleteFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/deleteMaterial`, {...formData}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}

export const api_updateMaterial = async (formData) =>{
    try {
        const {data:{user_id : manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        return InsertFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/updateMaterial`, {...formData, manager_id}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}