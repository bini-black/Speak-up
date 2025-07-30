import { useState, useEffect, useRef } from "react";

export default function AdminLogin() {
  const [faydaId, setFaydaId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function isValidFaydaID(id) {
    return /^[0-9]{20}$/.test(id);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValidFaydaID(faydaId.trim())) {
      setError("Fayda ID must be exactly 20 digits and contain only numbers.");
      return;
    }

    setError("");
    setSubmitted(true);
  }

  function handleChange(e) {
    const val = e.target.value.trimStart(); // allow trailing spaces but not leading
    // Only allow digits, remove others
    if (/^\d*$/.test(val) && val.length <= 20) {
      setFaydaId(val);
      if (error) setError("");
    }
  }

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        <p className="text-lg">
          Fayda ID: <strong>{faydaId}</strong>
        </p>
        <p className="mt-6 text-xl font-semibold text-gray-700">Coming Soon</p>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-2xl mb-4 text-center font-bold">Admin Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <label htmlFor="faydaId" className="sr-only">
          Fayda ID
        </label>
        <input
          id="faydaId"
          name="faydaId"
          type="tel"
          inputMode="numeric"
          pattern="\d{20}"
          placeholder="Enter your 20-digit Fayda ID"
          value={faydaId}
          onChange={handleChange}
          className={`p-2 border rounded ${
            error ? "border-red-600" : "border-gray-300"
          }`}
          maxLength={20}
          aria-invalid={!!error}
          aria-describedby={error ? "faydaId-error" : undefined}
          ref={inputRef}
          autoComplete="off"
        />
        {error && (
          <p id="faydaId-error" className="text-red-600 text-sm" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={faydaId.length !== 20}
          className={`py-2 rounded text-white ${
            faydaId.length === 20
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
