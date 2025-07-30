import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 py-8 bg-gray-50">
      <Navbar />
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        Welcome to SpeakUp
      </h1>
      <p className="max-w-md text-center text-gray-600 mb-6">
        A safe space to talk about mental health and connect with others.
      </p>

      <div className="flex flex-col w-full sm:w-80 gap-4">
        <button
          onClick={() => alert("Coming Soon")}
          aria-label="Meet Psychiatrists - Coming Soon"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          🩺 Meet Psychiatrists
        </button>

        <button
          onClick={() => navigate("/general-discussion")}
          aria-label="Go to General Discussion"
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          💬 General Discussion
        </button>
      </div>
    </div>
  );
}
