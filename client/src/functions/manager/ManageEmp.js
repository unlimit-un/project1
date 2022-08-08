import { getEngineerByManagerId, getEngineerDeptByManagerId, getLocationByManagerId, getMaidByManagerId, getOutSideEngineerByManagerId } from "../../controllers/manager/ManageEmpController"
import { getImageOfUserByFileName } from "../../controllers/manager/UsersController"

export const loadOptionLocation = async (setOptionsLocation) => {
    const location = await getLocationByManagerId()
    setOptionsLocation([{value: '', text: 'กรุณาเลือกสถานที่'},...location.map(item=>{
        return {value: item['location_id'], text: item['location_name']}
    })])
}

export const loadOptionDept = async (setOptionsDept) => {
    const dept = await getEngineerDeptByManagerId()
    setOptionsDept([{value: '', text: 'กรุณาเลือกแผนกช่าง'},...dept.map(item=>{
        return {value: item['dept_id'], text: item['dept_name']}
    })])
}

export const loadMaidDataList = async (setMaidDataList, setMaidImageList) => {
    const data = await getMaidByManagerId()
    setMaidDataList([...data.map(item=>{
        return{
            username: item['maid_username'], 
            name: `${item['maid_name']} ${item['maid_surname']}`, 
            email:`${item['maid_email']}`, 
            tel:`${item['maid_tel']}`, 
            img: item['maid_img'],
            location:item['location_name'],
            description: ''
        }
    })])
    let arr = []
    let i = 0
    while (i < data.length) {
        const img = await getImageOfUserByFileName(data[i]['maid_img'])
        
        if (img) {
            arr.push(img)
            i++
        }
    }
    setMaidImageList(arr)
}

export const loadEngineerDataList = async (setEngineerDataList, setEngineerImageList) => {
    const data = await getEngineerByManagerId()
    setEngineerDataList([...data.map(item=>{
        return{
            username: item['engineer_username'], 
            name: `${item['engineer_name']} ${item['engineer_surname']}`, 
            email:`${item['engineer_email']}`, 
            tel:`${item['engineer_tel']}`, 
            img: item['engineer_img'],
            location:item['location_name'],
            description: ''
        }
    })])
    let arr = []
    let i = 0
    while (i < data.length) {
        const img = await getImageOfUserByFileName(data[i]['engineer_img'])
        
        if (img) {
            arr.push(img)
            i++
        }
    }
    setEngineerImageList(arr)
}

export const loadOutSideEngineerDataList = async (setEngineerDataList, setEngineerImageList) => {
    const data = await getOutSideEngineerByManagerId()
    setEngineerDataList([...data.map(item=>{
        return{
            username: null, 
            name: `${item['outside_engineer_name']} ${item['outside_engineer_surname']}`, 
            email:null, 
            tel:`${item['outside_engineer_tel']}`, 
            img: item['outside_engineer_img'],
            location: null,
            description: item['outside_engineer_description']
        }
    })])
    let arr = []
    let i = 0
    while (i < data.length) {
        const img = await getImageOfUserByFileName(data[i]['outside_engineer_img'])
        
        if (img) {
            arr.push(img)
            i++
        }
    }
    setEngineerImageList(arr)
}


