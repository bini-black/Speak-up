import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function GeneralDiscussion() {
  const navigate = useNavigate();

  const groups = [
    { id: "GAD", name: "Anxiety" },
    { id: "MDD", name: "Depression" },
    { id: "Panic-Disorder", name: "Panic Disorder" },
  ];

  function handleGroupClick(id) {
    navigate(`/chatroom/${id}`);
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center gap-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-8 text-center">General Discussion Groups</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => handleGroupClick(group.id)}
            className="w-full py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
            aria-label={`Join ${group.name} discussion group`}
          >
            {group.name}
          </button>
        ))}
      </div>
    </div>
  );
}
