import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
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
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 font-bold text-blue-600 cursor-pointer hover:underline"
        >
          &larr; Back to Home
        </button>

        {/* Title */}
        <h1 className="mb-6 text-4xl font-extrabold text-center text-gray-800">
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

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 text-lg placeholder-gray-400 ring ring-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="py-4 text-xl font-semibold text-white transition duration-300 bg-blue-600 cursor-pointer rounded-xl hover:bg-blue-700"
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
}
