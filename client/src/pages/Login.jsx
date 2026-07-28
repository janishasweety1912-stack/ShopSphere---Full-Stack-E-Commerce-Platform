import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post(
        "/auth/login",
        formData
      );
      login(
        response.data.user,
        response.data.token
      );
      alert("Login successful");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#111827] border border-cyan-400/30 shadow-lg shadow-cyan-400/20 p-8 rounded-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400">
          Welcome Back
        </h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-[#020617] text-white border border-purple-500/30 p-3 rounded-lg mb-4 outline-none focus:border-cyan-400"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-[#020617] text-white border border-purple-500/30 p-3 rounded-lg mb-4 outline-none focus:border-cyan-400"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold py-3 rounded-lg hover:scale-105 transition"
        >
          Login
        </button>
        <p className="text-center mt-5 text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-cyan-400 cursor-pointer hover:text-cyan-300"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;