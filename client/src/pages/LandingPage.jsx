import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center h-screen px-4 bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
        Welcome to SpeakUp
      </h1>
      <p className="text-lg text-center text-gray-700 mb-8 max-w-xl">
        SpeakUp is a safe space where users can find support, express emotions,
        and connect with others on mental health topics.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          type="button"
          aria-label="Login as Admin"
          className="bg-blue-600 text-white py-3 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          onClick={() => navigate("/login/admin")}
        >
          Login as Admin
        </button>
        <button
          type="button"
          aria-label="Login as Psychiatrist"
          className="bg-green-600 text-white py-3 rounded shadow hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
          onClick={() => navigate("/login/psychiatrist")}
        >
          Login as Psychiatrist
        </button>
        <button
          type="button"
          aria-label="Login as User"
          className="bg-purple-600 text-white py-3 rounded shadow hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
          onClick={() => navigate("/login/user")}
        >
          Login as User
        </button>
      </div>
    </main>
  );
}

export default LandingPage;
