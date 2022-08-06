import { axiosGet, axiosPost, ROOT_SERVER } from "../../functions/AxiosCustom";
import Swal from "sweetalert2";

export const getMaterialeData = async () => {
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/getMaterialeData?engineer_id=${user_id}`);
        
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const getMaterialOfUser = async () => {
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/getMaterialOfUser?engineer_id=${user_id}`);
        
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const insertOrderMaterial = async (formData) => {
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosPost(`${ROOT_SERVER}/api/engineer/insertOrderMaterial`, {...formData, engineer_id: user_id});
        
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const deleteOrderMaterial = async (formData) => {
    try {
        return Swal.fire({
            title: 'ต้องการลบข้อมูลหรือไม่',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            denyButtonText: `ไม่ใช่`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosPost(`${ROOT_SERVER}/api/engineer/deleteOrderMaterial`, {...formData});
                await Swal.fire({
                    title: "สำเร็จ",
                    icon: "success",
                    text: "ลบข้อมูลสำเร็จ"
                })
                return true
            }else{
                return false
            }
          })
    } catch (error) {
        console.error(error)
    }
}