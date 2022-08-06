import { axiosGet, axiosPost, ROOT_SERVER } from "../../functions/AxiosCustom";
import Swal from 'sweetalert2'

export const getEngineerDeptByManagerId = async () => {
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getEngineerDeptByManagerId?manager_id=${user_id}`);
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const getEngineerDeptById = async (dept_id) => {
    try {
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getEngineerDeptById?dept_id=${dept_id}`);
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const getLocationByManagerId = async () => {
    try {
        const {data:{user_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosGet(`${ROOT_SERVER}/api/manager/getLocationByManagerId?manager_id=${user_id}`);
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const insertEngineerDept = async (formData) => {
    try {
        const {data:{user_id: manager_id}} = await axiosGet(`${ROOT_SERVER}/api/checkToken`);
        const {data} = await axiosPost(`${ROOT_SERVER}/api/manager/insertEngineerDept`, {...formData, manager_id});
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const editEngineerDept = async (formData) => {
    try {
        const {data} = await axiosPost(`${ROOT_SERVER}/api/manager/editEngineerDept`, {...formData});
        return data;
    } catch (error) {
        console.error(error)
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
    }
}



