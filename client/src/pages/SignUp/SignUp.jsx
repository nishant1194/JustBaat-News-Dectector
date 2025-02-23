import React, { useState } from "react";
import "../SignUp/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Linkk from "../../assets/Linkk";
 
function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(Linkk+"/api/auth/register", {
        name:username,
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Signup successful! Redirecting...");
        localStorage.setItem("UserIdId", JSON.stringify(response.data.newuser));

        setTimeout(() => navigate("/"), 2000); // Redirect after 2s
      } else {
        toast.error(response.data.message || "Signup failed!");
      }
    } catch (error) {
      toast.error("Error signing up! Try again.");
    }
  };

  return (
    <div className="mainC">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="maindiv">
        <div className="Login">Sign Up</div>
        <div className="started">Create an account to get started</div>

        <div className="inputF">
          <input
            className="inpput"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="inputF">
          <input
            className="inpput"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputF password-field">
          <input
            className="inpput"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
        </div>

        <div className="terms">
          * Our <Link to="/terms">Terms and Conditions</Link> apply.
        </div>

        <button className="btn" onClick={handleSignUp}>SignUp</button>

        <div className="new">
          Already registered? <Link className="regi" to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
