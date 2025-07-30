import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Discussions", path: "/general-discussion" },
  { name: "Psychiatrists", path: null, alert: "Coming soon!" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleNavigate(path, alertMsg) {
    if (alertMsg) {
      alert(alertMsg);
    } else if (path) {
      navigate(path);
      setMenuOpen(false);
    }
  }

  return (
    <nav
      aria-label="Primary navigation"
      className="bg-white shadow-md px-6 py-4"
    >
      <div className="flex justify-between items-center">
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold text-purple-700 cursor-pointer select-none"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/dashboard")}
        >
          SpeakUp
        </h1>

        <button
          className="sm:hidden text-purple-700"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row mt-4 sm:mt-0 gap-3 sm:gap-6 flex-wrap items-center`}
      >
        {menuItems.map(({ name, path, alert }) => (
          <button
            key={name}
            onClick={() => handleNavigate(path, alert)}
            className={`text-gray-700 hover:text-purple-700 text-base transition ${
              location.pathname === path ? "font-semibold underline" : ""
            }`}
            aria-current={location.pathname === path ? "page" : undefined}
          >
            {name}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-800 font-semibold text-base"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
