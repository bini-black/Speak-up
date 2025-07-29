import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate('/register');
  };

  return (
    <div className="font-sans text-gray-800">
      <nav className="bg-blue-700 text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">SpeakUp</h1>
        <Link to="/login" className="underline">Login</Link>
      </nav>

      <header className="bg-blue-100 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">A Safe Space for Mental Health Support</h2>
        <p className="text-lg mb-6">Join anonymous rooms to talk to people and professionals.</p>
        <button
          onClick={handleJoin}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600"
        >
          Join Us
        </button>
      </header>

      <section className="py-12 px-6 bg-white">
        <h3 className="text-3xl font-bold mb-4">About Us</h3>
        <p className="text-lg leading-relaxed">
          SpeakUp is an initiative to support mental well-being by providing a safe, anonymous chatroom platform.
        </p>
      </section>

      <section className="py-12 px-6 bg-gray-100">
        <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
        <p>Email: support@speakup.com</p>
        <p>Phone: +251 912345678</p>
      </section>

      <section className="py-12 px-6 bg-white">
        <h3 className="text-3xl font-bold mb-4">About the Chatroom</h3>
        <p>
          Our chatrooms allow users to express their thoughts freely and get support from peers and professionals. You can stay anonymous and still feel heard.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
