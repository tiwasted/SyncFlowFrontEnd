import React, { useEffect } from "react";
import "../styles/Notification.css";

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message && type !== 'yellow') {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose, type]);

  if (!message) return null;

  return (
    <div
      className={`notification ${type} ${type !== 'yellow' ? 'auto-fade' : ''}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      onClick={onClose}
    >
      <span>{message}</span>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

export default Notification;
