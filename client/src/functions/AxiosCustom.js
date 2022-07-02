import axios from "axios";

export const axiosGet = async (uri) =>{
    const data = await axios.get(
        `${uri}`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('user_token')}`
            },
        }
    )
    return data;
}

export const axiosPost = async (uri, obj_data) =>{
    const data = await axios.post(
        `${uri}`,
        obj_data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('user_token')}`
            },
        }
    )
    return data;
}

export const axiosPostNonAuth = async (uri, obj_data) =>{
    const data = await axios.post(
        `${uri}`,
        obj_data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
    )
    return data;
}