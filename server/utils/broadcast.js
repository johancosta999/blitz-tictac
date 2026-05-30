const broadcast = (room, message) => {

    //loop through players
    room.players.forEach(player => {
        if(player.socket.readyState === WebSocket.OPEN){
            player.socket.send(JSON.stringify(message));
        }
    });

    room.viewers.forEach(viewer => {
        if(viewer.readyState === WebSocket.OPEN){
            viewer.send(JSON.stringify(message));
        }
    })

};

module.exports = { broadcast };