import React, { useState ,} from "react";
import axios from 'axios'
import { isValidEmail } from "../utils/isValidEmail";
import { isStrongPassword } from "../utils/isStrongPassword";
import {  useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;




function RegisterForm() {

  const [input, setInput] = useState({username:"",email:"",password:""});
  const [error,setError] = useState("");
  const navigate = useNavigate();



  

  const handleChange = (event)=>{
    let {name,value} = event.target;
    setInput((prevInput)=>({...prevInput,[name]:value}));
  };
  const handleSubmit = async(event)=>{
    event.preventDefault();
    try {
        if(!input.username || !input.email || !input.password){
            setError("Please Enter all field correctly");
            return;
        }
        else if(!isValidEmail(input.email)){
            return setError("Please enter a valid email address.")
        }
        else if(!isStrongPassword(input.password)){
            return setError("Please Enter password greater than 8 characters");
        }
        console.log("request hit start");
        const response = await axios.post(`${API_URL}/auth/register`,input,{
            headers:{'Content-Type':'application/json'}
        });
        console.log("request hit end");

        if(response.data.token){
          localStorage.setItem('token',response.data.token);
          console.log("Registration successful:" ,response.data);
          navigate("/");
          
        }
        else{
          return setError(response.data?.message);
        }
    } catch (error) {
        if(error.response){
            setError(error.response.data.error || "Registration failed. Please try again");
        }else{
            setError("An unexpected error occured");
        }

    }
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit} className="register-form" >
        <div className="form-group">
          <label>username: </label>
          <input
            type="text"
            name="username"
            value={input.username}
            placeholder="Username"
            onChange={handleChange}
          />
</div>

<div className="form-group" >
          <label>email: </label>
          <input
            type="email"
            name="email"
            value={input.email}
            placeholder="email"
            onChange={handleChange}

          />
          </div>
          <div className="form-group">
          <label>password: </label>
          <input
            type="password"
            name="password"
            value={input.password}
            placeholder="password"
            onChange={handleChange}

          />
          </div>
          {error && <div className="error-message">{error}</div> }
      <input className="submit-button" type="submit" />
      <div  style={{textAlign:"center",padding:"10px"}} >or</div>
        {/* <input className="submit-button" type="submit" /> */}
        <button className="logout-button" style={{padding:"8px",backgroundColor:"#3737db"}} onClick={()=>{
          navigate('/login')
        }}>Login</button>
      </form>
    </>
  );
}

export default RegisterForm;
