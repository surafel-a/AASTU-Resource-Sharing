import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(token, password, passwordConfirm);
      toast.success("Password reset successfully! You are now logged in.");
      navigate("/");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        "Reset failed. The link may have expired.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-lg p-10 bg-white shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faLock} className="text-blue-600 text-2xl" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 text-center">
            Reset Password
          </h1>
          <p className="mt-2 text-center text-gray-500">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* NEW PASSWORD */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={password}
                required
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 text-lg placeholder-gray-400 ring ring-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-500 cursor-pointer right-4 top-1/2 -translate-y-1/2 hover:text-gray-700 transition"
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                value={passwordConfirm}
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full p-4 text-lg placeholder-gray-400 ring ring-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FontAwesomeIcon
                icon={showConfirm ? faEye : faEyeSlash}
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute text-gray-500 cursor-pointer right-4 top-1/2 -translate-y-1/2 hover:text-gray-700 transition"
              />
            </div>
          </div>

          {/* PASSWORD MATCH INDICATOR */}
          {passwordConfirm && (
            <p
              className={`text-sm font-semibold ${
                password === passwordConfirm ? "text-green-600" : "text-red-500"
              }`}
            >
              {password === passwordConfirm
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`py-4 text-xl font-semibold text-white rounded-xl transition duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed opacity-70"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
