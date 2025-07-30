import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SetPassword() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function isValidPin(value) {
    return /^[0-9]{6}$/.test(value); // Exactly 6 digits
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidPin(pin)) {
      setError("Password must be exactly 6 digits.");
      return;
    }

    setError("");
    setLoading(true); 

    setTimeout(() => {
    setLoading(false);
    // Optionally store pin for demo only
    localStorage.setItem("userPIN", pin);
    navigate("/dashboard");
  }, 1500);


  /*
    try {
      const faydaId = localStorage.getItem("userFaydaId");
      if (!faydaId) {
        throw new Error("Fayda ID missing. Please login again.");
      }

      const response = await fetch("http://localhost:5000/api/set-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({ faydaId, pin }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to set password.");
      }

      navigate("/dashboard");
    }
      catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    } */
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Set Your 6-Digit Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <label htmlFor="pin" className="sr-only">6-Digit PIN</label>
        <input
          id="pin"
          type="password"
          placeholder="Enter 6-digit PIN"
          value={pin}
          onChange={(e) => {
            const val = e.target.value;
            // Allow only digits, max length 6
            if (/^\d{0,6}$/.test(val)) {
              setPin(val);
              if (error) setError("");
            }
          }}
          className={`p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600 border-gray-300 ${
            error ? "border-red-500" : ""
          }`}
          maxLength={6}
          disabled={loading}
          inputMode="numeric"
          aria-invalid={!!error}
          aria-describedby={error ? "pin-error" : undefined}
          autoComplete="one-time-code"
          ref={inputRef}
        />
        {error && (
          <p id="pin-error" className="text-red-600 text-sm" role="alert" aria-live="assertive">
            {error}
          </p>
        )}
        {loading && (
          <p className="text-purple-600 text-sm text-center">Setting password...</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`bg-purple-600 text-white py-2 rounded hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Please wait..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
