import {createRoom} from ("../model/Room")

const checkDraw = (board) => {

    for (let row = 0; row < 4; row++){
        
        for (let col = 0; col <4; col++){
            if(board[row][col] === null){
                return false;
            }
        }
    }

    return true;
};

module.exports = {checkDraw}