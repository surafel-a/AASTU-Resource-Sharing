import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, password);
      toast.success("Login successful");

      navigate("/");
    } catch (error) {
      const msg = error.response?.data?.msg || "Login failed. Try again.";
      toast.error(msg);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen px-4 bg-gray-100">
      <div className="w-full max-w-lg p-10 bg-white shadow-2xl rounded-2xl">
        {/* Title */}
        <h1 className="my-6 text-4xl font-extrabold text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="mb-6 text-lg text-center text-gray-500">
          Login to access your dashboard
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 text-lg placeholder-gray-400 ring ring-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 text-lg placeholder-gray-400 ring ring-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-500 cursor-pointer right-4 top-1/2 -translate-y-1/2 hover:text-gray-700 transition"
            />
          </div>

          <div className="text-right -mt-2">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline text-sm"
            >
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`py-4 text-xl font-semibold text-white rounded-xl transition duration-300
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed opacity-70"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }
            `}
          >
            Login
          </button>
        </form>

        {/* Sign Up Navigation */}
        <p className="mt-6 text-lg text-center text-gray-700">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="font-bold text-blue-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
