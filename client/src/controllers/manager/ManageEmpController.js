import { axiosGet, axiosGetImage, axiosPost, axiosPostFormData, ROOT_SERVER } from "../../functions/AxiosCustom";
import Swal from 'sweetalert2'

export const getEngineerDeptByManagerId = async () => {
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getEngineerDeptByManagerId?manager_id=${user_id}`);
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

export const getEngineerDeptById = async (dept_id) => {
    try {
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getEngineerDeptById?dept_id=${dept_id}`);
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

export const getLocationByManagerId = async () => {
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getLocationByManagerId?manager_id=${user_id}`);
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

export const insertEngineerDept = async (formData) => {
    try {
        const {data:{user_id: manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosPost(`${ROOT_SERVER}/api/manager/insertEngineerDept`, {...formData, manager_id});
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

export const editEngineerDept = async (formData) => {
    try {
        const {data} = await axiosPost(`${ROOT_SERVER}/api/manager/editEngineerDept`, {...formData});
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

export const deleteEngineerDept = async (formData) => {
    try {
        
        return Swal.fire({
            title: 'ต้องการลบข้อมูลหรือไม่',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            denyButtonText: `ไม่ใช่`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosPost(`${ROOT_SERVER}/api/manager/deleteEngineerDept`, {...formData});
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
// insert emp Part
export const insertEmp = async (formData) => {
    try {
        const {data:{user_id: manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const fd = new FormData();
        console.log(formData);
        fd.append("name", formData.name);
        fd.append("surname", formData.surname);
        fd.append("username", formData.username);
        fd.append("password", formData.password);
        fd.append("tel",  formData.tel);
        fd.append("email", formData.email);
        fd.append("image", formData.image);
        fd.append("manager_id", manager_id);
        fd.append("emp_code", formData.emp_code);
        fd.append("location_id", formData.location_id);
        fd.append("description", formData.description);

        if (formData['role'] === 'maid') {
            const {data} = await axiosPostFormData(`${ROOT_SERVER}/api/manager/insertMaid`, fd);
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
        }else if (formData['role'] === 'en') {
            fd.append("engineer_dept", formData['engineer_dept']);
            const {data} = await axiosPostFormData(`${ROOT_SERVER}/api/manager/insertEngineer`, fd);
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
        }else if (formData['role'] === 'os_en') {
            fd.append("engineer_dept", formData['engineer_dept']);
            const {data} = await axiosPostFormData(`${ROOT_SERVER}/api/manager/insertOutSideEngineer`, fd);
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
        }else{
            return Swal.fire({
                title: "ผิดพลาด",
                icon: "error",
                text: `ไม่มีพบประเภทพนักงาน`
            }).then(()=>false)
        }
        
    } catch (error) {
        console.error(error)
        return Swal.fire({
            title: "ผิดพลาด",
            icon: "error",
            text: `${error.response.data}`
        }).then(()=>false)
    }
}

//todo get employee

export const getMaidByManagerId = async (formData) => {
    try {
        const {data:{user_id: manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getMaidByManagerId?manager_id=${manager_id}`);
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

export const getEngineerByManagerId = async (formData) => {
    try {
        const {data:{user_id: manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getEngineerByManagerId?manager_id=${manager_id}`);
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

export const getOutSideEngineerByManagerId = async () => {
    try {
        const {data:{user_id: manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getOutSideEngineerByManagerId?manager_id=${manager_id}`);
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




