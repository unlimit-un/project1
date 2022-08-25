import { axiosGet, axiosPost, ROOT_SERVER } from "../../functions/AxiosCustom";
import Swal from 'sweetalert2'

export const api_insertMaidDutyMaterial = async (formData) => {
    try {
        const {data} = await axiosPost(`${ROOT_SERVER}/api/manager/insertMaidDutyMaterial`, {...formData});
        if (data) {
            return Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ'
            }).then(()=>{
                return true
            })
        }
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

export const api_updateMaidDutyMaterial = async (formData) => {
    try {
        const {data} = await axiosPost(`${ROOT_SERVER}/api/manager/updateMaidDutyMaterial`, {...formData});
        if (data) {
            return Swal.fire({
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ'
            }).then(()=>{
                return true
            })
        }
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

export const api_deleteMaidDutyMaterial = async (formData) => {
    try {
        return Swal.fire({
            title: 'ต้องการลบข้อมูลหรือไม่',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            denyButtonText: `ไม่ใช่`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosPost(`${ROOT_SERVER}/api/manager/deleteMaidDutyMaterial`,{...formData});
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
        await Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        })
    }
}