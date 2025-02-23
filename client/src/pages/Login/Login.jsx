import React, { useState } from "react";
import "../Login/logi.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Linkk from "../../assets/Linkk";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post(Linkk +"/api/auth/login", { email, password });
      if (response.data.success) {
        toast.success("Login successful!");
        console.log(response.data.newuser)
        localStorage.setItem("UserIdId", JSON.stringify(response.data.newuser));
        
  
        setTimeout(() => navigate("/"), 2000); // Redirect after 2s
      } else {
        toast.error("Invalid credentials, try again!");
      }
    } catch (error) {
      toast.error("Login failed! Check your credentials.");
    }
  };

  return (
    <div className="mainC">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="maindiv">
        <div className="Login">Login</div>
        <div className="started">to get started</div>

        <div className="inputF">
          <input
            className="inpput"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputF">
          <input
            className="inpput"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="forgotP" onClick={()=>{
            toast.warn("We are working on this feature");
        }}>
          <div>Forgot Password?</div>
        </div>

        <button className="btn" onClick={handleLogin}>Login</button>

        <div className="new">
          New user? <Link className="regi" to="/signUp">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
