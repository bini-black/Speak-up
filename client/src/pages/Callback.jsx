import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function handleLogin() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        setErrorMsg("Login failed: no code received.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          process.env.REACT_APP_API_URL + "/api/auth/login",
          { code },
          { signal: controller.signal }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/chatroom");
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Login request cancelled");
        } else {
          console.error("Login error:", err);
          setErrorMsg("Login failed. Please try again.");
          setLoading(false);
        }
      }
    }

    handleLogin();

    return () => {
      controller.abort();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Logging you in...</p>
        {/* You can add a spinner here if you like */}
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center">
        <p className="text-red-600 mb-4">{errorMsg}</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back to Login
        </button>
      </div>
    );
  }

  return null;
};

export default Callback;
