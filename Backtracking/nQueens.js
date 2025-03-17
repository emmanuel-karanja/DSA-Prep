/**This is one of the best implementations I have seen! It uses 2 diagonals set;
 * 
 * LOGIC:
 * 
 * 1. We validate an entire board i.e. you build it until you reach the last row of the board 
 * 2. And then add the board to the solution. 
 */

function solveNQueens(N) {
    let solutions = [];
    //fill the board with x to represent an empty cell
    let board = Array.from({ length: N }, () => Array(N).fill('x')); 
    let cols = new Set(), diag1 = new Set(), diag2 = new Set(); 

    function backtrack(row) {
        //if we are in the last row, then, we've made it, this is a valid board.
        if (row === N) {
            solutions.push(board.map(row => row.join(''))); 
            return;
        }

        for (let col = 0; col < N; col++) {
            //validate the current choice
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue;
            }

            // Place queen
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            // Recurse to next row
            backtrack(row + 1);

            // Remove queen (Backtrack)
            board[row][col] = 'x';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }

    backtrack(0);
    return solutions;
}

// Test the function
console.log(solveNQueens(4));
