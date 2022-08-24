
import Swal from 'sweetalert2'
export const DeleteFormSwal = async (axiosPost) =>{
    try {
        return Swal.fire({
            title: 'ต้องการลบข้อมูลหรือไม่',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            denyButtonText: `ไม่ใช่`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosPost();
                await Swal.fire({
                    title: "สำเร็จ",
                    icon: "success",
                    text: "บันทึกข้อมูลสำเร็จ"
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
export const DenyFormSwal = async (axiosPost) =>{
    try {
        return Swal.fire({
            title: 'ต้องการปฏิเสธใช่หรือไม่',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            denyButtonText: `ไม่ใช่`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosPost();
                await Swal.fire({
                    title: "สำเร็จ",
                    icon: "success",
                    text: "บันทึกข้อมูลสำเร็จ"
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
export const InsertToastFormSwal = async (axiosPost) =>{
    try {
        const {data} = await axiosPost();
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
export const InsertFormSwal = async (axiosPost) =>{
    
    try {
        const {data} = await axiosPost();
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

