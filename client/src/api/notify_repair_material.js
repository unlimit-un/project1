import { axiosGet, axiosPost, ROOT_SERVER } from "../functions/AxiosCustom";
import Swal from 'sweetalert2'
import { DeleteFormSwal, DenyFormSwal, InsertFormSwal, InsertToastFormSwal } from "../functions/Swal";

export const api_getNotifyRepairMaterialByRepairId = async (notify_repair_id) => {
    try {
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getNotifyRepairMaterialByRepairId?notify_repair_id=${notify_repair_id}`);
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


export const api_deleteNotifyRepairMaterial = async (formData) =>{
    try {
        return DenyFormSwal(()=>{axiosPost(`${ROOT_SERVER}/api/manager/deleteNotifyRepairMaterial`,{...formData});})
        
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}

export const api_insertNotifyRepairMaterial = async (formData) =>{
    try {
        return InsertToastFormSwal(()=>axiosPost(`${ROOT_SERVER}/api/manager/insertNotifyRepairMaterial`, {...formData}))
    } catch (error) {
        console.error(error)
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}
