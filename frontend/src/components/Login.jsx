import React, { useState } from "react";
import { isValidEmail } from "../utils/isValidEmail";
import { isStrongPassword } from "../utils/isStrongPassword";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    let { name, value } = event.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    setError(null);
   try {
     if( !input.email || !input.password){
       setError("Please Enter all field correctly");
       return;
      }
    if(!isValidEmail(input.email)){
      return setError("Enter correct email");
    }
    if(!isStrongPassword(input.password)){
      return setError("Enter correct password");
    }
 const response = await axios.post(
  `${API_URL}/auth/login`,
  JSON.stringify(input),
  {
    headers: { "Content-Type": "application/json" }
  }
);

    if(response.data.token){
      localStorage.setItem('token',response.data.token);
      console.log("Login Succesful", response.data);
      navigate("/");
    }
    else{
      return  setError("Login Failed. No token generated");

    }
   } catch (error) {
    if(error.response){
      console.log("error in login  ",error.response?.data);
      setError(error.response.data.message || "Login failed. please try again"); 
    }else{
      console.log("Unexpected error: ",error);
      setError("An unexpected error occured while login");
    }
   }

  };

  
  return (
    <>
      <form action="" onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
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
          navigate('/register')
        }}>Register</button>


      </form>
    </>
  );
}

export default Login;
