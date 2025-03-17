/**This is one of the best implementations I have seen! It uses 2 diagonals set;
 * 
 * LOGIC:
 * 
 * 1. We validate an entire board i.e. you build it until you reach the last row of the board 
 * 2. And then add the board to the solution. 
 * 
 * DIAGONALS EXPLAINED
 * 
 * A value on the diagonal has the same value e.g. (2,2) or (3,3)
 * 
 * so 2-2=0 and the anti diagonal we do the sum
 * 
 * take [[2,0],[2,1][1,2],[2,2]]
 * 
 * A quick dry run with pen and paper shows that for any small square it's true.
 */

function solveNQueens(N) {
    let solutions = [];
    //fill the board with x to represent an empty cell
    let board = Array.from({ length: N }, () => Array(N).fill('x')); 

    let cols = new Set();
    //diagonal from top left to bottom right
    let mainDiag = new Set();
    //diagonal from top right to bottom left
     antiDiag = new Set(); 

    function backtrack(row) {
        //if we are in the last row, then, we've made it, this is a valid board.
        if (row === N) {
            solutions.push(board.map(row => row.join(''))); 
            return;
        }

        for (let col = 0; col < N; col++) {
            //validate the current choice
            if (cols.has(col) || mainDiag.has(row - col) || antiDiag.has(row + col)) {
                continue;
            }

            // Place queen
            board[row][col] = 'Q';
            cols.add(col);
            mainDiag.add(row - col);
            antiDiag.add(row + col);

            // Recurse to next row
            backtrack(row + 1); //row is incremented here

            // Remove queen (Backtrack)
            board[row][col] = 'x';
            cols.delete(col);
            mainDiag.delete(row - col);
            antiDiag.delete(row + col);
        }
    }

    backtrack(0);
    return solutions;
}

// Test the function
console.log(solveNQueens(4));
