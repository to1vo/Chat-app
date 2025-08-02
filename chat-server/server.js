import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port:3000 });

wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    console.log("New client connected!");

    ws.on("message", function message(message, isBinary) {
        console.log("Message received from client");
        
        wss.clients.forEach(function each(client) {
            if(client.readyState === WebSocket.OPEN){
                client.send(message, { binary: isBinary });
            }
        })
    })

    // ws.send("Welcome new client!");
})