import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await API.post("/auth/register", formData);

      alert("Registration successful");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed"
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
          Create Account
        </h1>

        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-[#020617] text-white border border-purple-500/30 p-3 rounded-lg mb-4 outline-none focus:border-cyan-400"
        />

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
          Register
        </button>

        <p className="text-center mt-5 text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-400 cursor-pointer hover:text-cyan-300"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;