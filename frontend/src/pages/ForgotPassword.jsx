import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await forgotPassword(email);
      setSent(true);
      toast.success("Reset link sent! Check your email.");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        "Failed to send reset email. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-lg p-10 bg-white shadow-2xl rounded-2xl">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 mb-6 font-bold text-blue-600 cursor-pointer hover:underline"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Login
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-blue-600 text-2xl"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 text-center">
            Forgot Password?
          </h1>
          <p className="mt-2 text-center text-gray-500">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {sent ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <p className="text-green-700 font-semibold text-lg">
              ✓ Reset link sent to <span className="font-bold">{email}</span>
            </p>
            <p className="text-green-600 mt-2 text-sm">
              Check your inbox and click the link to reset your password. The
              link expires in 10 minutes.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 text-lg placeholder-gray-400 ring ring-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`py-4 text-xl font-semibold text-white rounded-xl transition duration-300 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed opacity-70"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
