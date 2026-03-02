import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const navigate = useNavigate(); // for redirect

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password
      });

      if (res.data.success) {
        // ✅ Store email in localStorage
        localStorage.setItem("userEmail", email);

        setResponse("Login successful 🎉");

        // 🔥 Redirect to Questions page
        navigate("/questions");
      } else {
        setResponse("Invalid credentials ❌");
      }
    } catch (error) {
      setResponse("Server error. Try again.");
    }
  };

  return (
    // <div className="form-container">
    //   <h2>Login 👤</h2>

    //   <input
    //     type="email"
    //     placeholder="Enter Email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />

    //   <input
    //     type="password"
    //     placeholder="Enter Password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />

    //   <button onClick={handleLogin}>Login</button>

    //   {response && <p className="response">{response}</p>}
    // </div>

    <div className="login-page">
  <div className="login-form-container">
    <h2>Login 👤</h2>

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

    <button onClick={handleLogin}>Login</button>

    {response && <p className="response">{response}</p>}
  </div>
</div>
  );
}

export default Login;