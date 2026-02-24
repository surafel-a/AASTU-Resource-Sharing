import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    universityId: "",
    phoneNumber: "",
    department: "",
    yearOfStudy: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(import.meta.env.VITE_BACKEND_URL);

    try {
      await signup(formData);
      navigate("/");

    } catch (error) {
      console.log(error.response?.data || "Signup failed");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-4xl">
        <button onClick={() => navigate("/")}
          className="mb-6 text-blue-600 font-bold hover:underline cursor-pointer"
        >
          &larr; Back to Home
        </button>

        <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800">
          Create Account
        </h1>
        <p className="text-lg text-gray-500 text-center mb-6">
          Sign up to get started
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              required
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            <input
              type="text"
              name="universityId"
              placeholder="University ID"
              required
              value={formData.universityId}
              onChange={handleChange}
              className="border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Department</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Electromechanical Engineering">Electromechanical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Environmental Engineering">Environmental Engineering</option>
              <option value="Architecture">Architecture</option>
              <option value="Mining Engineering">Mining Engineering</option>
              <option value="Biotechnology">Biotechnology</option>
              <option value="Food Science">Food Science</option>
            </select>

            <select
              name="yearOfStudy"
              required
              value={formData.yearOfStudy}
              onChange={handleChange}
              className="border rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Year of Study</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="5">5th Year</option>
              <option value="6">6th Year</option>
            </select>
          </div>

          {/* SUBMIT BUTTON - FULL WIDTH */}
          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white py-4 rounded-xl text-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-lg text-gray-700">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-bold hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
