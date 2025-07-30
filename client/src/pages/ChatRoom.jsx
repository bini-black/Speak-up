import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

// const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Real API base (commented)

export default function ChatRoom() {
  const { groupId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Auto-scroll if near bottom
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // ✅ FAKE message loader (for testing)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMessages([
        { id: 1, text: "Welcome to the chat room!" },
        { id: 2, text: "Feel free to say something." }
      ]);
      setLoading(false);
    }, 1000);
  }, [groupId]);

  /*
  // 🛑 REAL message fetch (commented out until backend is ready)
  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`${API_BASE}/api/chat/${groupId}/messages`);
        if (!response.ok) throw new Error("Failed to load messages.");
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, [groupId]);
  */

  async function handleSend() {
    const trimmedInput = input.trim();
    if (trimmedInput === "") return;

    setSending(true);
    setError("");

    // ✅ FAKE send logic for now
    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        text: trimmedInput,
      };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      setSending(false);
    }, 500);

    /*
    // 🛑 REAL send logic (commented until backend ready)
    try {
      const response = await fetch(`${API_BASE}/api/chat/${groupId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput }),
      });

      if (!response.ok) throw new Error("Failed to send message.");

      const savedMessage = await response.json();
      setMessages((prev) => [...prev, savedMessage]);
      setInput("");
    } catch (err) {
      setError(err.message || "Error sending message.");
    } finally {
      setSending(false);
    }
    */
  }

  function handleInputChange(e) {
    setInput(e.target.value);
    if (error) setError("");
  }

  return (
    <div className="min-h-screen p-6 max-w-lg mx-auto flex flex-col">
      <Navbar />
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 select-none">
        Chat Room: {groupId}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 mt-6 animate-pulse" role="status" aria-live="polite">
          Loading messages...
        </p>
      ) : (
        <>
          {error && (
            <p
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4"
              role="alert"
            >
              {error}
            </p>
          )}

          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-auto border border-gray-300 p-4 rounded mb-4 flex flex-col space-y-2"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.length === 0 ? (
              <p className="text-gray-500">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id || msg._id || msg.timestamp || msg.text}
                  className="p-2 bg-gray-200 rounded max-w-full break-words"
                >
                  {msg.text || msg}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 mt-auto">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className={`flex-grow p-2 border rounded focus:outline-none transition ${
                error
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-purple-500"
              }`}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && !sending && handleSend()}
              disabled={loading || sending}
              aria-label="Message input"
              aria-invalid={!!error}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || sending}
              aria-disabled={loading || sending}
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
