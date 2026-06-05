const checkThreeRow = (board, playerIndex) => {
    for(let row = 0; row < 4; row ++){
        if(
            (
                board[row][0] === playerIndex &&
                board[row][1] === playerIndex &&
                board[row][2] === playerIndex 
            )  || (
                board[row][1] === playerIndex &&
                board[row][2] === playerIndex &&
                board[row][3] === playerIndex
            )
        ){ return true}
    }

    for(let col = 0; col < 4; col ++){
        if(
            (
                board[0][col] === playerIndex &&
                board[1][col] === playerIndex &&
                board[2][col] === playerIndex 
            )  || (
                board[1][col] === playerIndex &&
                board[2][col] === playerIndex &&
                board[3][col] === playerIndex
            )
        ){ return true}
    }

    if (
        (
            board[0][0] === playerIndex &&
            board[1][1] === playerIndex &&
            board[2][2] === playerIndex
        ) ||

        (
            board[0][1] === playerIndex &&
            board[1][2] === playerIndex &&
            board[2][3] === playerIndex 
        ) ||

        (
            board[1][0] === playerIndex &&
            board[2][1] === playerIndex &&
            board[3][2] === playerIndex 
        ) ||

        (
            board[1][1] === playerIndex &&
            board[2][2] === playerIndex &&
            board[3][3] === playerIndex   
        )
    ){
        return true;
    }

    if (
        (
            board[0][2] === playerIndex &&
            board[1][1] === playerIndex &&
            board[2][0] === playerIndex
        ) ||

        (
            board[0][3] === playerIndex &&
            board[1][2] === playerIndex &&
            board[2][1] === playerIndex 
        ) ||

        (
            board[1][3] === playerIndex &&
            board[2][2] === playerIndex &&
            board[3][1] === playerIndex 
        ) ||

        (
            board[1][2] === playerIndex &&
            board[2][1] === playerIndex &&
            board[3][0] === playerIndex 
        )
    ){
        return true;
    }

    return false;
}


// to this
module.exports = { checkThreeInARow: checkThreeRow }