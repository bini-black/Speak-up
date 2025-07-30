import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const handleLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const savedState = localStorage.getItem("oauthState");

      if (!code) {
        setError("Missing authorization code");
        setLoading(false);
        return;
      }

      if (state !== savedState) {
        setError("Invalid state parameter");
        setLoading(false);
        return;
      }

      try {
        const apiUrl = process.env.REACT_APP_API_URL?.replace(/\/$/, "");
        if (!apiUrl) throw new Error("API URL not configured");

        const response = await axios.post(
          `${apiUrl}/api/auth/login`,
          { code },
          {
            signal: controller.signal,
            headers: { "Content-Type": "application/json" }
          }
        );

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.removeItem("oauthState");
          navigate("/chatroom");
        } else {
          throw new Error(response.data.error || "Authentication failed");
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        
        console.error("Login error:", err);
        setError(
          err.response?.data?.error ||
          err.message ||
          "Failed to authenticate. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    handleLogin();

    return () => controller.abort();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Authenticating...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">Login Failed</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Callback;