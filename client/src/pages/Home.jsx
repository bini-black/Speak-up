import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">Welcome to SpeakUp</h1>
        <p className="text-lg text-gray-700 max-w-md mx-auto">
          SpeakUp is a safe and supportive platform where individuals can discuss mental health issues anonymously and find help.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/login")}
          aria-label="Navigate to login page"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
        >
          Login
        </button>
        <button
          onClick={() => alert("About Us Coming Soon")}
          aria-label="Learn more about us"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-400 transition"
        >
          About Us
        </button>
      </div>
    </main>
  );
}
