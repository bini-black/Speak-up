import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginType() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 gap-6 text-center">
      <h1 className="text-3xl font-bold">Choose Login Type</h1>

      <div className="flex flex-col gap-4 w-full sm:w-80 max-w-xs">
        <button
          type="button"
          aria-label="Login as Admin"
          onClick={() => navigate("/login/admin")}
          className="py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
        >
          Login as Admin
        </button>

        <button
          type="button"
          aria-label="Login as Psychiatrist"
          onClick={() => navigate("/login/psychiatrist")}
          className="py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
        >
          Login as Psychiatrist
        </button>

        <button
          type="button"
          aria-label="Login as User"
          onClick={() => navigate("/login/user")}
          className="py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
        >
          Login as User
        </button>
      </div>
    </main>
  );
}
