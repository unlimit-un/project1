import { axiosGet, axiosPost, ROOT_SERVER } from "../../functions/AxiosCustom";
import Swal from "sweetalert2";

export const getWorkData = async () => {
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/getWorkData?engineer_id=${user_id}`);
        
        return data;
    } catch (error) {
        console.error(error)
    }
}
export const updateNotifyRepairToProcessing = async ( formData ) =>{
    try {
        const {data:{user_id: engineer_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosPost(`${ROOT_SERVER}/api/engineer/updateNotifyRepairToProcessing`, {...formData, engineer_id});
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

export const getWorkDataStatusProcess = async () =>{
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/getWorkDataStatusProcess?engineer_id=${user_id}`);
        
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const updateNotifyRepairToSuccess = async ( formData ) =>{
    try {
        const {data:{user_id: engineer_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosPost(`${ROOT_SERVER}/api/engineer/updateNotifyRepairToSuccess`, {...formData, engineer_id});
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

export const updateNotifyRepairToUnable = async ( formData ) =>{
    try {
        return Swal.fire({
            title: 'ต้องการยกเลิกใช่หรือไม่',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            denyButtonText: `ไม่ใช่`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosPost(`${ROOT_SERVER}/api/engineer/updateNotifyRepairToUnable`,{...formData});
                await Swal.fire({
                    title: "สำเร็จ",
                    icon: "success",
                    text: "ยกเลิกงานสำเร็จ"
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

