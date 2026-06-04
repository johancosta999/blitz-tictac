const broadcast = (room, message) => {
    // loop through players
    room.players.forEach(player => {
        try {
            if (player.socket && player.socket.readyState === 1) {
                player.socket.send(JSON.stringify(message));
            }
        } catch (err) {
            console.error('Error sending to player', err);
        }
    });

    // loop through viewers
    room.viewers.forEach(viewer => {
        try {
            if (viewer && viewer.readyState === 1) {
                viewer.send(JSON.stringify(message));
            }
        } catch (err) {
            console.error('Error sending to viewer', err);
        }
    });

};

module.exports = { broadcast };