import { useEffect, useState } from "react";
import { ChatApplication } from "./chatApp.jsx";
const initialMessages = [];

function UserRegistrationForm({ onUsername }) {
  const [username, setUsername] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    onUsername(username);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <button>Submit</button>
    </form>
  );
}
export function Chat() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState(initialMessages);
  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://" + window.location.host + "/api/chat");
    ws.onopen = (event) => {
      console.log("Opened", event);
    };
    ws.onmessage = (event) => {
      console.log("message", event);
      const { user, message } = JSON.parse(event.data);
      setMessages((messages) => [...messages, { message, user }]);
    };
    setWs(ws);
  }, []);

  function handleNewMessage(message) {
    ws.send(JSON.stringify({ message, user }));
  }

  if (!user) {
    return <UserRegistrationForm onUsername={setUser} />;
  }

  return (
    <ChatApplication messages={messages} onNewMessage={handleNewMessage} />
  );
}
