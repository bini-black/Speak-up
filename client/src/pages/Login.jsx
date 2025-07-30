import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [faydaId, setFaydaId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function isValidFaydaID(id) {
    return /^[0-9]{16}$/.test(id);
  }

  function generateRandomState(length = 16) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidFaydaID(faydaId)) {
      setError("Fayda ID must be exactly 16 digits.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      localStorage.setItem("pendingFaydaId", faydaId);

      const state = generateRandomState();
      localStorage.setItem("oauthState", state);

      const params = new URLSearchParams({
        response_type: "code",
        client_id: process.env.REACT_APP_CLIENT_ID,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        scope: "openid profile email",
        state,
        login_hint: `id:${faydaId}`,
      });

      window.location.href = `${process.env.REACT_APP_AUTHORIZATION_ENDPOINT}?${params.toString()}`;
    } catch (err) {
      setError("Failed to initiate login.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">User Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <label htmlFor="faydaId" className="block text-sm font-medium text-gray-700 mb-1">
              Fayda ID
            </label>
            <input
              id="faydaId"
              type="tel"
              placeholder="Enter your 16-digit Fayda ID"
              value={faydaId}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setFaydaId(value);
                if (error) setError("");
              }}
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              maxLength={16}
              disabled={loading}
              aria-invalid={!!error}
              aria-describedby="faydaId-error"
              ref={inputRef}
              inputMode="numeric"
              pattern="[0-9]{16}"
              autoComplete="off"
            />
            {error && (
              <p id="faydaId-error" className="mt-1 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !isValidFaydaID(faydaId)}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
              loading || !isValidFaydaID(faydaId) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Redirecting..." : "Continue with Fayda"}
          </button>
        </form>
      </div>
    </div>
  );
}