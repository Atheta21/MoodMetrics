import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
   <div className="login-page">
  <div className="login-form-container">
    <h2>Login</h2>

    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        required
      />

      <button type="submit">Login</button>
    </form>

    {/* 👇 Add this below form */}
    <p style={{ marginTop: "20px" }}>
      New user?{" "}
      <Link to="/register" style={{ color: "#ff7e5f", fontWeight: "bold" }}>
        Register here
      </Link>
    </p>
  </div>
</div>
  );
}

export default Login;