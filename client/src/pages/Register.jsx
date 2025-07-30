import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client validation example
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post("http://localhost:5000/api/users/register", formData);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to register. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-6"
        noValidate
        aria-describedby="error-message"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={formData.name}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your full name"
            required
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="At least 6 characters"
            required
            autoComplete="new-password"
            minLength={6}
          />
        </div>

        {error && (
          <p
            id="error-message"
            className="text-red-600 text-sm text-center"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline hover:text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
