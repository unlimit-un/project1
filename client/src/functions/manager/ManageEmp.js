import { getEngineerDeptByManagerId, getLocationByManagerId } from "../../controllers/manager/ManageEmpController"

export const loadOptionLocation = async (setOptionsLocation) => {
    const location = await getLocationByManagerId()
    setOptionsLocation([{value: '', text: 'กรุณาเลือกสถานที่'},...location.map(item=>{
        return {value: item['location_id'], text: item['location_name']}
    })])
}

export const loadOptionDept = async (setOptionsDept) => {
    const location = await getEngineerDeptByManagerId()
    setOptionsDept([{value: '', text: 'กรุณาเลือกแผนกช่าง'},...location.map(item=>{
        return {value: item['dept_id'], text: item['dept_name']}
    })])
}
