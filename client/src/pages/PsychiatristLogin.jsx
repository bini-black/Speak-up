import { useState, useEffect, useRef } from "react";

export default function PsychiatristLogin() {
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

    if (!isValidFaydaID(faydaId)) {
      setError("Fayda ID must be exactly 20 digits and contain only numbers.");
      return;
    }

    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="p-6 text-center max-w-sm mx-auto">
        <h2 className="text-2xl mb-4">Psychiatrist Login</h2>
        <p className="text-lg">
          Fayda ID: <strong>{faydaId}</strong>
        </p>
        <p className="mt-6 text-xl font-semibold text-gray-700">Coming Soon</p>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-2xl mb-4 text-center font-bold">Psychiatrist Login</h2>
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
          className={`p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 border-gray-300 ${
            error ? "border-red-500" : ""
          }`}
          maxLength={20}
          inputMode="numeric"
          ref={inputRef}
          aria-invalid={!!error}
          aria-describedby="faydaId-error"
          autoComplete="off"
        />
        {error && (
          <p id="faydaId-error" className="text-red-600 text-sm" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
