import Swal from "sweetalert2"
import { axiosGet, axiosPost, axiosPostNonAuth } from "./AxiosCustom";

const ROOT_SERVER =`http://${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}`;
export const LoginFunc = async (userData, navigate, pathname) => {
  try {
    const data ={
      username: userData.username,
      password: userData.password,
      type: userData.type
    }
    const result = await axiosPostNonAuth(`${ROOT_SERVER}/api/non_auth/login`, data)
    console.log(result);
    if (result.status === 200) {
      localStorage.setItem('user_token', result.data);
      await Swal.fire({
        title: "สำเร็จ",
        icon: "success",
        text: "กำลังเข้าสู่ระบบ"
      }).then(()=>{
        checkAutoRedirectUser(navigate, pathname)
      })
    }
  } catch (error) {
      await Swal.fire({
        title: "ผิดพลาด",
        icon: "error",
        text: `${error.response.data}`
      })
  }
   
}

export const checkAutoRedirectUser = async (navigate, pathname) =>{
  if (localStorage.getItem('user_token')) {
    try {
      const uri = `${ROOT_SERVER}/api/checkToken`;
      const resToken = await axiosGet(uri);
      const {user_type} = resToken.data;
      if (resToken.status === 200 || resToken.data === "OK") {
        if (!(pathname.includes('manager')||pathname.includes('maid')||pathname.includes('engineer'))) {
          user_type === 'MANAGER'  ?navigate('/manager') :user_type ==='MAID' ?navigate('/maid'):navigate('/engineer')
        }
      }
    } catch (error) {
      console.log(error);
  
    }
  }
    
}

export const SignOutFunc = async (navigate) =>{

  try {
    const uri = `${ROOT_SERVER}/api/logout`;
    const result = await axiosPost(uri)
    
    if (result.status === 200) {
      
      localStorage.clear();
      navigate('/');
    }else{
      console.log(result);
    }

  } catch (error) {
    console.log(error);
  }


}

