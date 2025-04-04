class TicTacToe {
    constructor() {
        this.board = Array(3).fill(null).map(() => Array(3).fill(" "));
        this.currentPlayer = "X";
    }

    printBoard() {
        console.log("\n");
        this.board.forEach(row => console.log(row.join(" | ")));
        console.log("\n");
    }

    makeMove(row, col) {
        if (this.board[row][col] !== " ") {
            console.log("Invalid move! Cell already occupied.");
            return false;
        }

        this.board[row][col] = this.currentPlayer;
        if (this.checkWin(row, col)) {
            this.printBoard();
            console.log(`🎉 Player ${this.currentPlayer} wins!`);
            return true;
        }

        if (this.isDraw()) {
            this.printBoard();
            console.log("It's a draw!");
            return true;
        }

        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        return false;
    }

    checkWin(row, col) {
        const player = this.currentPlayer;

        // Check row
        if (this.board[row].every(cell => cell === player)) return true;

        // Check column
        if (this.board.every(r => r[col] === player)) return true;

        // Check main diagonal (row == col)
        if (row === col && this.board.every((r, i) => r[i] === player)) return true;

        // Check anti-diagonal (row + col == 2)
        if (row + col === 2 && this.board.every((r, i) => r[2 - i] === player)) return true;

        return false;
    }

    isDraw() {
        return this.board.flat().every(cell => cell !== " ");
    }
}

// 🏆 Game Loop (Command-line Play)
const game = new TicTacToe();
game.printBoard();

// Simulate a game (manual input for testing)
const moves = [
    [0, 0], [0, 1],
    [1, 1], [0, 2],
    [2, 2]  // X wins
];

for (let [row, col] of moves) {
    if (game.makeMove(row, col)) break;
    game.printBoard();
}
