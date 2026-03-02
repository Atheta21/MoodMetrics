// src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
  if (!name || !email || !password) {
    setResponse("Please fill all fields ⚠️");
    return;
  }

  try {
    console.log("Sending data:", { name, email, password });

    const res = await axios.post("http://localhost:5000/register", {
      name,
      email,
      password
    });

    console.log("Success response:", res.data);

    setResponse(res.data.message);

    setTimeout(() => {
      navigate("/login");
    }, 2000);

  } catch (err) {
    console.error("AXIOS ERROR OBJECT:", err);

    if (err.response) {
      console.log("Backend Response Data:", err.response.data);
      console.log("Backend Status:", err.response.status);
      setResponse(err.response.data.message);
    } 
    else if (err.request) {
      console.log("No response received:", err.request);
      setResponse("No response from server ❌");
    } 
    else {
      console.log("Error setting up request:", err.message);
      setResponse("Request error ❌");
    }
  }
};

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Register 📝</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>

        {response && <p className="response">{response}</p>}
      </div>
    </div>
  );
}

export default Register;