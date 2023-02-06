

class Player{
  /**
     * constructor function that sets the symbol of the player
     * @param {string} symbol - symbol of the player (x or o)
     */
  constructor(symbol){
    this.symbol = symbol;
  }
}

class Board{
  /**
   * constructor function that sets the initial state of the board
   */
  constructor(){
    this.board = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ]
  }

  /**
   * Method that converts the user input number to corresponding position on the board array
   * @param {number} input - user input number (1-9)
   * @return {array} - [y, x] position on the board array
   */
  convertInputToPosition(input){
    if (input>=1 && input<=3){
      return [0, input-1];
    }
    else if (input>=4 && input<=6){
      return [1, input-4];
    }
    else if (input>=7 && input<=9) {
      return [2, input-7];
    }
  }

  /**
   * Method that checks if the move is legal or not
   * @param {number} x - x position on the board array
   * @param {number} y - y position on the board array
   * @return {boolean} - returns true if the move is legal, false otherwise
   */
  checkMoveLegal(x, y){
    if (this.board[y][x] == 0){
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Method that adds the symbol to the board on the corresponding position
   * @param {string} symbol - symbol of the player (x or o)
   * @param {number} x - x position on the board array
   * @param {number} y - y position on the board array
   */
  addSymbolToTheBoard(symbol, x, y){
    this.board[y][x] = symbol;
  }

  /**
   * Method that checks the score of the game
   * @return {string} - returns "Player 1 won!", "Player 2 won!", "Draw!", or "IN PROGRESS"
   */
  checkScore(){
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2] && this.board[i][0] !== 0) {
        return this.board[i][0];
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i] && this.board[0][i] !== 0) {
        return this.board[0][i];
      }
    }

    // Check diagonals
    if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] && this.board[0][0] !== 0) {
      return this.board[0][0];
    }
    if (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0] && this.board[0][2] !== 0) {
      return this.board[0][2];
    }

    // Check for a draw
    let emptyCells = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === 0) {
          emptyCells++;
        }
      }
    }
    if (emptyCells === 0) {
      return "DRAW";
    }

    // If no winner or draw, the game is still in progress
    return "IN PROGRESS";
  }

  checkWhoWon(player1Symbol, player2Symbol) {
    let gameState = this.checkScore();
    if (gameState == player1Symbol) {
      return "Player 1 won!";
    } else if (gameState == player2Symbol) {
      return "Player 2 won!";
    } else if (gameState == "DRAW") {
      return "Draw!";
    }
  }
}

class Game{
  /**
   * Constructor that sets properties before the game and initiates objects
   * Creates two players, new board, and initializes the current player as player 1
   */
  constructor(){
    this.player1 = new Player("x");
    this.player2 = new Player("o");
    this.board = new Board();
    this.currentPlayer = this.player1;
  }

  /**
   * Method that initiates one turn of the game of Tic-Tac-Toe
   * @param {integer} gridPosition 
   * @param {DOM Element} object 
   */
  turnGame(gridPosition, object){
    let gameFinished = false;
    let outputField = document.querySelector('.outputField');
    let [x,y] = this.board.convertInputToPosition(gridPosition);
      if (this.board.checkMoveLegal(x, y)){
        this.board.addSymbolToTheBoard(this.currentPlayer.symbol, x, y);
        if (this.currentPlayer.symbol == "x"){
          let symbolhtml = document.createElement('IMG');
          symbolhtml.src = "images/tic-tac-toe-X.png";
          object.appendChild(symbolhtml);
        }
        else {
          let symbolhtml = document.createElement('IMG');
          symbolhtml.src = "images/tic-tac-toe-O (1).png";
          object.appendChild(symbolhtml);
        }
        if (this.board.checkScore()=="IN PROGRESS"){
          if (this.currentPlayer == this.player1)
            this.currentPlayer = this.player2;
          else if (this.currentPlayer == this.player2){
            this.currentPlayer = this.player1;
          }
        }
        else {
          let message = document.createElement('div');
          message.textContent = this.board.checkWhoWon(this.player1.symbol, this.player2.symbol);
          outputField.appendChild(message);
          gameFinished = true;
        }
      }
      else {
        console.log("Please input the  possible value")
      }
  }
}

//Initaition of game object and attachement of turnGame method to every single grid on the DOM Tree through event listeners
let game = new Game();
let gridElement = document.querySelectorAll('.gridElement');
  for (let i = 0; i<gridElement.length; i++){
    gridElement[i].addEventListener('click', function(e){
      game.turnGame(e.target.id, gridElement[i]);
    })
}

//Functionality for the reset button
let reset = document.querySelector('.reset');
reset.addEventListener('click', function(e){
  game.board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ]

  let gridElement = document.querySelectorAll('.gridElement');
  for (let i = 0; gridElement.length; i++){
    gridElement[i].innerHTML = "";
  }
})




