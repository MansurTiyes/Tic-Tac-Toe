class Player{
  constructor(symbol){
    this.symbol = symbol;
  }
}

class Board{
  constructor(){
    this.board = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ]
  }

  //Method that converts corresponding input number to the position on board array
  //Parametr: user input
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

  //Method that checks if move is legal or not
  //Parametr: x and y position on the board array
  checkMoveLegal(x, y){
    if (this.board[y][x] == 0){
      return true;
    }
    else {
      return false;
    }
  }

  //Method that adds symbol to the board on corresponding place
  //Parameters: takes symbol of the player, x position on the array, y position on the array
  addSymbolToTheBoard(symbol, x, y){
    this.board[y][x] = symbol;
  }

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
      console.log("Player 1 won!");
    } else if (gameState == player2Symbol) {
      console.log("Player 2 won!");
    } else if (gameState == "DRAW") {
      console.log("Draw!");
    }
  }
}

class Game{
  constructor(){
    this.player1 = new Player("x");
    this.player2 = new Player("o");
    this.board = new Board();
    this.currentPlayer = this.player1;
  }

  turnGame(gridPosition){
    let gameFinished = false;
    let [x,y] = this.board.convertInputToPosition(gridPosition);
      if (this.board.checkMoveLegal(x, y)){
        this.board.addSymbolToTheBoard(this.currentPlayer.symbol, x, y);
        if (this.board.checkScore()=="IN PROGRESS"){
          if (this.currentPlayer == this.player1)
            this.currentPlayer = this.player2;
          else if (this.currentPlayer == this.player2){
            this.currentPlayer = this.player1;
          }
        }
        else {
          this.board.checkWhoWon(this.player1.symbol, this.player2.symbol);
          gameFinished = true;
        }
      }
      else {
        console.log("Please input the  possible value")
      }
      console.log(this.board);
      //ADD SOMETHING THAT SHOWS THAT GAME FINISHED
  }
}

let game = new Game();
let gridElement = document.querySelectorAll('.gridElement');
  for (let i = 0; i<gridElement.length; i++){
    gridElement[i].addEventListener('click', function(e){
      game.turnGame(e.target.id);
      let symbolhtml = document.createElement('IMG');
      if (game.currentPlayer.symbol == "x"){
        symbolhtml.src = "images/tic-tac-toe-X.png";
        gridElement[i].appendChild(symbolhtml);
      }
      else if (game.currentPlayer.symbol == "o") {
        symbolhtml.src = "images/circle.png";
        gridElement[i].appendChild(symbolhtml);
      }
    })
}




