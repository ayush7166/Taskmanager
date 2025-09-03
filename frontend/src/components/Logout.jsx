import React from 'react'
import {  useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = ()=>{
        try {
            localStorage.removeItem('token');
            navigate("/login")
        } catch (error) {
            console.log("Error while logout user");
        }

    }
  return (<>
<button className='logout-button' onClick={handleLogout} >Logout</button>
  </>
)
}

export default LogoutButton