import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../css/loginform.css";

const AuthForm = ({ setAuth }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginOutput, setLoginOutput] = useState("");
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [registerOutput, setRegisterOutput] = useState("");

  const handleToggle = () => setIsActive(!isActive);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await API.post("auth/login", loginData);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("username", res.data.name);
      sessionStorage.setItem("email", res.data.email);
      setLoginOutput("Login Successful");
      setTimeout(() => {
        setAuth(true);
        navigate("/home", { replace: true });
      }, 1000);
    } catch (err) {
      setLoginOutput(err.response?.data?.message || "Invalid Credentials");
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    if (registerData.password.length < 8) {
      setRegisterOutput("Password length must be at least 8 characters");
      return;
    }
    try {
      await API.post("auth/register", registerData);
      setRegisterOutput("Registration Successful");
      setTimeout(() => setIsActive(false), 2000);
    } catch (err) {
      setRegisterOutput(err.response?.data?.message || "Signup failed. Try again!");
    }
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`}>
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={e => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={e => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="forgot-link"><a href="#">Forgot password?</a></div>
          <button type="submit" className="btn">Login</button>
          <p id="loutput">{loginOutput}</p>
          <p className="text-sm text-gray-500">Are you an Admin?</p>
          <button
            onClick={() => navigate("/admin")}
            className="mt-2 btn admin-btn"
          >
            Go to Admin Login
          </button>
        </form>
      </div>
      <div className="form-box register">
        <form onSubmit={handleRegister}>
          <h1>Registration</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={registerData.name}
              onChange={e => setRegisterData({ ...registerData, name: e.target.value })}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
              required
            />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className="btn">Register</button>
          <p id="routput">{registerOutput}</p>
        </form>
      </div>
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>Don't have an Account?</p>
          <button className="btn register-btn" onClick={handleToggle}>Register</button>
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>Already have an Account?</p>
          <button className="btn login-btn" onClick={handleToggle}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
