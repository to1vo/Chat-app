import { useRef } from "react";
import ChatMessage from "./ChatMessage";

function Chat({ socket, messages, username, color }){
    const inputRef = useRef(null);

    const sendMessage = () => {
        const msg = inputRef.current.value.trim();
        if(msg === "") return;
        socket.send(JSON.stringify({
            name: username,
            msg: msg,
            color: color
        }));
        inputRef.current.value = "";
    }

    return (
        <>
        <h1>Chat</h1>
        <div className="chat-container">
            <div className="chat-header">
                <p style={{color: `${color}`}}>{username}</p>
            </div>
            <div className="chat-area">
                {
                    messages.map((message, index) => {
                        return <ChatMessage message={message} username={username} key={index} />
                    })
                }
            </div>
            <div className="chat-input-container">
                <input type="text" ref={inputRef} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
        </>
    )
}

export default Chat;