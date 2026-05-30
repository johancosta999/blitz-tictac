const WebSocket = require("ws");
const {createRoom} = ("./model/Room")

const {broadcast} = ("./utils/broadcast")

const PORT = process.env.PORT || 8081;
const wss = new WebSocket.Server({ port: PORT });

console.log(`Server running on port ${PORT}`);


const rooms = new Map();

wss.on("connection", (ws) => {
    ws.on("message", (rawMessage) => {
        try {
        const data = JSON.parse(rawMessage);

        // route to correct handler based on message type
        if (data.type === "join") joinHandler(ws, data, rooms);
        if (data.type === "move") moveHandler(ws, data, rooms);
        if (data.type === "swap") swapHandler(ws, data, rooms);
        if (data.type === "bomb") bombHandler(ws, data, rooms);
        if (data.type === "timeout") timeoutHandler(ws, data, rooms);

        } catch (err) {
        console.error("Invalid message", err);
        }
    });

    ws.on("close", ()=>{
        console.log("Client disconnected");

    });
});

