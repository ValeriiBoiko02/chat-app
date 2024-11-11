// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setError('');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await axios.post(`${API_URL}/messages`, {
        sender: username,
        content: message
      });
      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded"
                data-testid="username-input"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                data-testid="password-input"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
              data-testid="login-button"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Chat Room</h1>
          <p>Logged in as: {username}</p>
        </div>
        <div className="h-96 overflow-y-auto p-4" data-testid="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="mb-4 p-3 bg-gray-100 rounded"
              data-testid="message-item"
            >
              <p className="font-bold">{msg.sender}</p>
              <p>{msg.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(msg.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Type your message..."
              data-testid="message-input"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              data-testid="send-button"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;