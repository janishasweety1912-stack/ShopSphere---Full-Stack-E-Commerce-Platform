import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://shopsphere-full-stack-e-commerce-platform.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid admin credentials");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Admin login error:", error);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen
      bg-[#020617]
      flex
      items-center
      justify-center
      px-6
    ">

      <div className="
        w-full
        max-w-md
        bg-[#111827]
        rounded-3xl
        p-8
        shadow-xl
        border
        border-gray-800
      ">

        <div className="
          flex
          justify-center
          mb-6
        ">

          <div className="
            w-16
            h-16
            rounded-2xl
            bg-gradient-to-br
            from-cyan-400
            to-purple-500
            flex
            items-center
            justify-center
            text-[#020617]
            shadow-lg
            shadow-purple-500/20
          ">
            <ShieldCheck size={32} />
          </div>

        </div>


        <h1 className="
          text-3xl
          font-bold
          text-center
          text-white
        ">
          ShopSphere
        </h1>


        <h2 className="
          text-center
          text-gray-400
          mt-1
          mb-8
        ">
          Admin Panel Login
        </h2>


        {error && (
          <div className="
            bg-red-500/10
            border
            border-red-500/20
            rounded-xl
            px-4
            py-3
            mb-5
          ">
            <p className="
              text-red-400
              text-center
              text-sm
            ">
              {error}
            </p>
          </div>
        )}


        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="
              text-gray-300
              text-sm
              mb-2
              block
            ">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@shopsphere.com"
              required
              className="
                w-full
                bg-[#020617]
                border
                border-gray-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-cyan-400
                transition
              "
            />

          </div>


          <div>

            <label className="
              text-gray-300
              text-sm
              mb-2
              block
            ">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="
                w-full
                bg-[#020617]
                border
                border-gray-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-purple-400
                transition
              "
            />

          </div>


          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              rounded-xl
              font-bold
              text-[#020617]
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
              hover:opacity-90
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;