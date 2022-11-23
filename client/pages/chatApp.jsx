import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ChatApplication({ messages, onNewMessage }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    onNewMessage(message);
    setMessage("");
  }
  return (
    <>
      <header className={"footermove headerText"}>Modern Snack Chat</header>
      <main className={" border"}>
        {messages.map(({ message, user }, index) => (
          <div key={index}>
            <strong>{user}:</strong> {message}
          </div>
        ))}
      </main>
      <footer className={"footermove"}>
        <form className={"formsize"} onSubmit={handleSubmit}>
          <input
            className={"input2"}
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={"button"}>Send</button>
          <button className={"button"} onClick={(e) => navigate("/")}>
            back
          </button>
        </form>
      </footer>
    </>
  );
}
