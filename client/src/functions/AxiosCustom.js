import axios from "axios";
export const ROOT_SERVER =`http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}`
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

export const axiosGetImage = async (uri) =>{
    const data = await axios.get(
        `${uri}`, 
        {
            headers: {
                'Content-Type': 'image/jpeg',
                'Accept': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('user_token')}`
                
            },
            responseType: "blob"
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