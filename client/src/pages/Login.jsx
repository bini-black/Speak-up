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
      // Save the Fayda ID temporarily if needed
      localStorage.setItem("pendingFaydaId", faydaId);

      // Generate random OAuth state
      const state = generateRandomState();
      localStorage.setItem("oauthState", state);

      // Build the authorization URL for Fayda OIDC
      const params = new URLSearchParams({
        response_type: "code",
        client_id: process.env.REACT_APP_CLIENT_ID,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        scope: "openid profile email",
        state,
      });

      const authUrl = process.env.REACT_APP_AUTHORIZATION_ENDPOINT + "?" + params.toString();

      // Redirect to Fayda authorization page
      window.location.href = authUrl;
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
          <label htmlFor="faydaId" className="sr-only">
            Fayda ID
          </label>
          <input
            id="faydaId"
            type="tel"
            placeholder="Enter your 16-digit Fayda ID"
            value={faydaId}
            onChange={(e) => {
              setFaydaId(e.target.value.trimStart());
              if (error) setError("");
            }}
            className={`p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300 ${
              error ? "border-red-500" : ""
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
            <p id="faydaId-error" className="text-red-600 text-sm" role="alert">
              {error}
            </p>
          )}
          {loading && (
            <p className="text-purple-600 text-sm text-center" role="status" aria-live="polite">
              Redirecting to Fayda login...
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !isValidFaydaID(faydaId)}
            className={`bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition focus:outline-none focus:ring-4 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-disabled={loading || !isValidFaydaID(faydaId)}
          >
            {loading ? "Please wait..." : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
}
