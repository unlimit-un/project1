import React from 'react'

import axios from "axios";

export const LoginFunc = async (userData, navigate) => {
    const result = await axios.post(`http://localhost:3001/api/login`,
      {
        username: userData.username,
        password: userData.password,
        type: userData.type
      },
      {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true
      }
    )
    // console.log(result.data);
    if (result.status === 200) {
        
        localStorage.setItem('user_data', JSON.stringify(result.data));
        navigate('/manager');
    }else{
        console.log(result);
    }

    return(<></>);
}

