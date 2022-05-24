/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({ sigint: true });

// `board` holds the current state of the game 

function gen_initial_board(){
    return {
        1: ' ', 2: ' ', 3: ' ',
        4: ' ', 5: ' ', 6: ' ',
        7: ' ', 8: ' ', 9: ' '
    };
}

// possible value of board
// ' ' for no one.
// 'X' for player X
// 'O' for player O
let board = gen_initial_board();

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    // correct.
    board[position] = mark.toUpperCase();
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    // correct.
    console.log(`
    ${board[1]} | ${board[2]} | ${board[3]} 
    ----------------
    ${board[4]} | ${board[5]} | ${board[6]} 
    ----------------
    ${board[7]} | ${board[8]} | ${board[9]}
    `);
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    // position is actually the move
    // the move is for example Number 5.

    // first check.
    if (position >= 1 && position <= 9) {
        
        // second check.
        if (board[position] === " ") {
            return true;
        }
    }

    return false;
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9], [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    // you implement this function correctly.


    let i, j, markCount
    // use for-of
    for (i = 0; i < winCombinations.length; i++) {
        markCount = 0;

        // using 'if' to check directly.

        for (j = 0; j < winCombinations[i].length; j++) {
            if (board[winCombinations[i][j]] === player) {
                markCount++;
            }
            if (markCount === 3) {
                return true;
            }
        }
    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (let i = 1; i <= Object.keys(board).length; i++) {
        if (board[i] === " ") {
            return false;
        }
    }
    return true;
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {

    // you can use prompt to get user input directly like you'are doing in number-guessing project
    // actually you have used it before. this `prompt`
    let move = Number(prompt(`${player}: input a number to place:`));
    // move will hold '5', String
    // do a conversion.
    // from '5' to 5

    // `is_valid` can be true / false.
    // let is_valid = validateMove(move);
    // if (is_valid === false) {
    //     // ask your user again: pls input a valid number.
    //     move = Number(prompt(`${player}: input a number to place:`));

    //     // if your gamer still input some invalid string.
    //     // we should ask again and again until your user input-string is valid.
    // }

    // second version.
    // we need to use a while loop
    // recap: `while` will break if the condition is false.

    // `!` will do reverse
    // true to false,   false to true
    // whether to break or not. telling the `while`
    // while will check the condition
    while (!validateMove(move)) {
        console.log("Invalid! input again!");
        move = Number(prompt(`${player}: input a number to place:`));
    }

    // for this line on, `move` must be valid.

    // 'a' which is invalid.
    // '5' is valid, since this can be converted to 5, that is a number
    // '20' is invalid, since this game is tic tac toe. 0-9

    // change the position stored in the variable `board`.
    // note, `board` holds the current state of the game 

    // this line updates the current state of the game
    markBoard(move, player);

    // this line show the user the current state.
    // since the state of the game has changed.
    printBoard();



}



// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let is_game_ended = false;
let currentTurnPlayer = 'X';



// recap about while
// `while` will do the body of while-loop again and again 
// until the condition is false.
while (!is_game_ended) {
    playTurn(currentTurnPlayer);
    // feel free to add logic here if needed, e.g. announcing winner or tie

    // i think the winner or tie can be detected in here, in this so-called top while loop

    // check if `winner` or `tie` is detected. 
    if (checkWin(currentTurnPlayer) === true) {
        console.log(`Congratulations! the winner ${currentTurnPlayer}!`);
        // after setting this `is_game_ended`,
        // this while loop will break. just game is over.
        // no more next round for players to move.
        is_game_ended = true;
    }
    if (checkFull() === true) {
        console.log("Good Game. It's a tie.");

        // the same reason for the tie.
        is_game_ended = true;
    }

    // you have to do a user-switch in here.
    if (currentTurnPlayer == 'X') {
        currentTurnPlayer = 'O';
    } else {
        currentTurnPlayer = 'X';
    }


    // if game ended.
    if (is_game_ended) {
        // bonus
        let yes_or_no = prompt("Start a new game? (Yes/No");
        if (yes_or_no === "Yes") {

            // kind-of restart our game.
            is_game_ended = false;
            // so the while-loop will continue running.            
            
            // actually we have to do a reset to our game board

            // you have to init our new board(game).
            board = gen_initial_board();
            // optional
            // currentTurnPlayer = 'X';

            // otherwise.
            // the old board(state) remains.
        }
    }
}


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
