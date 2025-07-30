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
    return /^[0-9]{20}$/.test(id);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidFaydaID(faydaId)) {
      setError("Fayda ID must be exactly 20 digits.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
    setLoading(false);
    localStorage.setItem("token", "mockToken");
    localStorage.setItem("userFaydaId", faydaId);
    navigate("/set-password");
  }, 1500);

    /*
    try {
      const response = await fetch("http://localhost:5000/api/login(ezih gar asgebut stchersu)", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faydaId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userFaydaId", faydaId);

      navigate("/set-password");
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }*/
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
            placeholder="Enter your 20-digit Fayda ID"
            value={faydaId}
            onChange={(e) => {
              setFaydaId(e.target.value.trimStart());
              if (error) setError("");
            }}
            className={`p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300 ${
              error ? "border-red-500" : ""
            }`}
            maxLength={20}
            disabled={loading}
            aria-invalid={!!error}
            aria-describedby="faydaId-error"
            ref={inputRef}
            inputMode="numeric"
            pattern="[0-9]{20}"
            autoComplete="off"
          />

          {error && (
            <p id="faydaId-error" className="text-red-600 text-sm" role="alert">
              {error}
            </p>
          )}
          {loading && (
            <p className="text-purple-600 text-sm text-center" role="status" aria-live="polite">
              Verifying...
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
