function ChatMessage({ message, username }) {
    //gets the message object
    //and checks if its send by you
    if(message.name === username){
        return (
            <div className="chat-message your-msg">
                <p id="message-username"><b>Sinä</b></p>
                <p id="message">{message.msg}</p>
            </div>
        )
    }
    return (
        <>
        <div className="chat-message">
            <p id="message-username" style={{color: `${message.color}`}}><b>{message.name}</b></p>
            <p id="message">{message.msg}</p>
        </div>
        </>
    )
}

export default ChatMessage;