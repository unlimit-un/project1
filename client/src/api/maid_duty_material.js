import { axiosGet, axiosPost, ROOT_SERVER } from "../functions/AxiosCustom";
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