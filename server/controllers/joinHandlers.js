const { createRoom } = require("../models/Room");
const { broadcast } = require("../utils/broadcast");

const joinHandler = (ws, data, rooms) => {
    const roomCode = data.room;

    //create room if doeant exist
    if(!rooms.has(roomCode)) {
        rooms.set(roomCode, createRoom());
    }

    const room = rooms.get(roomCode)

    //player join
    if(data.role === 'player'){

        //room is full
        if(room.players.length === 2){
            ws.send(JSON.stringify({ type: "room_full"}))
            return;
        }

        //figure out player index and symbol
        const playerIndex = room.players.length;
        const symbol = playerIndex === 0 ? "X" : "O";

        //create player object and add to room
        const player = {
            socket : ws,
            playerIndex: playerIndex,
            symbol: symbol
        };
        room.players.push(player);

        //store info on socket for later use 
        ws.roomCode = roomCode;
        ws.playerIndex = playerIndex;
        ws.role = "player";

        //tell this client they joined successfully
        ws.send(JSON.stringify(
            {
                type: "joined",
                role: "player",
                playerIndex: playerIndex,
                symbol: symbol,
            }
        ));

        //if 2 players are in the room
        if (room.players.length === 2){
            room.gameStarted = true;
            broadcast(room, {
                type: "game_start",
                board: room.board,
                currentTurn: room.currentTurn,
            });
        }
    }

    if(data.role === "viewer"){
        room.viewers.push(ws)
        ws.roomCode = roomCode;
        ws.role = "viewer";

        ws.send(JSON.stringify({ type: "joined", role: "viewer"}))
        ws.send(JSON.stringify({ type: "game_state", board: room.board }));
    }
};

module.exports = { joinHandler };