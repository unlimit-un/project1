import { axiosGet, ROOT_SERVER } from "../../functions/AxiosCustom";

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
