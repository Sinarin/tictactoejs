const Game = (() => {
    const gameboard = [];
    for (let s = 0; s < 3; s++){
        gameboard.push([null, null, null]);
    }
    const place_piece = (y, x, player) => { gameboard[y-1][x-1] = player }

    const check_win = () => {
        
        for (let a = 0; a < 3; a++) {
            //if row are the same
            if (gameboard[a][0] === gameboard[a][1] && gameboard[a][1] === gameboard[a][2] && gameboard[a][0] != null) {
                return true;
            //if columns are the same
            } else if (gameboard[0][a] === gameboard[1][a] && gameboard[1][a] === gameboard[2][a] && gameboard[0][a] != null) {
                return true;
            }
        }
        //if diagonals are the same
        if (gameboard[1][1] != null && ((gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]) ||
            (gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]))) {
                return true
            } else {
                return false
            }
    }


    return {gameboard, place_piece, check_win}
})();

const Player = (team) => {
    return {team};
};



const Game_flow = (() => {
    console.log("asdfsadfda")
    const player1 = Player("X");
    const player2 = Player("O");
    let current_player = player1;
    const instruct = document.querySelector(".instructions");
    const cells = document.querySelectorAll(".cell");
    cells.forEach( cell => { 
        cell.addEventListener('click', () => {
            if (cell.innerText === "") {
                cell.innerText = current_player.team;
                Game.place_piece(cell.getAttribute("data-y"), cell.getAttribute("data-x"), current_player.team);
                if (!Game.check_win()){
                    if (current_player === player1) {
                        current_player = player2;
                    } else if (current_player === player2){
                        current_player = player1;
                    }
                //if win is true change message to you win and have retry button
                } else if (Game.check_win()) {
                    instruct.innerText = `${current_player.team} Wins!`;
                }
            } else {
                //change instruction to "this space is taken, please try again..."
                instruct.innerText = "This space is taken, please try again...";
            }
        })
    });
})();



Game.place_piece(3, 1, 'x');
console.log(Game.gameboard);

