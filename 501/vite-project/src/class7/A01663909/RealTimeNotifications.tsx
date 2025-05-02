import React, { useEffect, useState } from 'react';

const RealTimeNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket('ws://localhost:8080');

    // Connection opened
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setConnected(true);
    };

    // Listen for messages
    ws.onmessage = (event) => {
      const message = event.data;
      console.log('Received notification:', message);
      setNotifications((prevNotifications) => [...prevNotifications, message]);
    };

    // Connection closed
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
    };

    // Connection error
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnected(false);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="p-4 border rounded shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Real-Time Notifications</h2>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            connected
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 italic">No notifications yet</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification, index) => (
            <li
              key={index}
              className="p-2 bg-blue-50 border border-blue-100 rounded"
            >
              {notification}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RealTimeNotifications;