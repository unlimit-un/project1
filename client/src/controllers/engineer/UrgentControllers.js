import { axiosGet, axiosPost, ROOT_SERVER } from "../../functions/AxiosCustom";
import Swal from "sweetalert2";

export const geturgentData = async () => {
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/engineer/geturgentData?engineer_instead_id=${user_id}`);
        
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const updateurgentById = async ( formData ) =>{
    try {
        return Swal.fire({
            title: 'ต้องการลบข้อมูลหรือไม่',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            denyButtonText: `ไม่ใช่`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosPost(`${ROOT_SERVER}/api/engineer/updateurgentById`,{...formData});
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
                text: error.response.data
            })
        }
    }