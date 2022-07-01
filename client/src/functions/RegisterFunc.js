import Swal from "sweetalert2"
import axios from "axios";

export const LoginFunc = async (userData, navigate) => {
    const result = await axios.post(`http://localhost:3001/api/register`,
      {
        name: userData.name,
        surname: userData.surname,
        username: userData.username,
        password: userData.password,
        tel: userData.tel,
        email: userData.email,
        type: userData.type
      },
      {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true
      }
    ).catch( async (error)=>{
      await Swal.fire({
        title: "ผิดพลาด",
        icon: "error",
        text: `${error.response.data}`
      })
    })
    
    if (result.status === 200) {
        
        localStorage.setItem('user_data', JSON.stringify(result.data));
        await Swal.fire({
          title: "สำเร็จ",
          icon: "success",
          text: "กำลังเข้าสู่ระบบ"
        }).then(()=>{
          navigate('/Login');
        })
        
    }
}
