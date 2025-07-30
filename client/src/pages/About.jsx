import React from "react";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <main
      role="main"
      className="min-h-screen max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-6"
    >
      <Navbar />

      <h1 className="text-3xl font-bold mb-6 mt-4">About Us</h1>

      <p className="mb-6 text-gray-700 leading-relaxed">
        Welcome to <strong>SpeakUp</strong>! Our mission is to provide a safe,
        supportive space for mental health discussions. Whether you’re struggling
        or just want to connect, we’re here to listen.
      </p>

      <p className="mb-6 text-gray-700 leading-relaxed">
        This platform allows users to join group chats based on mental health
        topics, meet psychiatrists <em>(coming soon)</em>, and share their
        experiences openly and securely.
      </p>

      <p className="mb-6 text-gray-700 leading-relaxed">
        We believe mental health matters. SpeakUp is built to break stigma and
        create a supportive community.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <address className="not-italic text-gray-700 space-y-1">
          <p>
            Email:{" "}
            <a
              href="mailto:contact@speakup.com"
              className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              contact@speakup.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+251912345678"
              className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              +251 912 345 678
            </a>
          </p>
          <p>Address: 123 Main Street, Addis Ababa, Ethiopia</p>
        </address>
      </section>

      <footer className="mt-10 text-sm text-gray-500 text-center">
        &copy; 2025 SpeakUp Team
      </footer>
    </main>
  );
}
