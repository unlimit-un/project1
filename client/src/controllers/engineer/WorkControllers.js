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