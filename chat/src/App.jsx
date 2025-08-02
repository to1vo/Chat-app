import { useState, useEffect } from "react"
import Chat from "./Chat.jsx";
import Input from "./Input.jsx";

const socket = new WebSocket("ws://ip-osoite:3000");
// const socket = new WebSocket("ws://localhost:3000");

function App() {
  const [username, setUsername] = useState(null);
  const [color, setColor] = useState("#ff0000");
  const [messages, setMessages] = useState([]);
  
  useEffect(() => { 
    const handleConnection = (e) => {
      console.log("Connected to server");
    }

    const handleMessage = (e) => {
      //update the messages array
      const newmsg = JSON.parse(e.data);
      setMessages(prev => [...prev, newmsg]);
      // console.log("Message from server ", e.data);
    }

    socket.addEventListener("open", handleConnection)
    socket.addEventListener("message", handleMessage);

    return () => {
      //cleanup
      socket.removeEventListener("open", handleConnection);
      socket.removeEventListener("message", handleMessage);
    }
  }, []);

  if(username === null){
    return <Input setUsername={setUsername} setColor={setColor} color={color} />
  }
  
  return (
    <>
    <Chat socket={socket} messages={messages} username={username} color={color} />
    </>
  )
}

export default App
