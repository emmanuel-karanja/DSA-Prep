/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given a 2D board containing 'X' and 'O', capture all regions surrounded by 'X'.
 * 
 * A region is captured by flipping all 'O's into 'X's in that surrounded region.
 * An 'O' on the border, or connected to a border 'O', is not surrounded.
 * 
 * Example:
 * ----------
 * Input:
 * [
 *   ['X','X','X','X'],
 *   ['X','O','O','X'],
 *   ['X','X','O','X'],
 *   ['X','O','X','X']
 * ]
 * Output:
 * [
 *   ['X','X','X','X'],
 *   ['X','X','X','X'],
 *   ['X','X','X','X'],
 *   ['X','O','X','X']
 * ]
 * 
 * Intuition:
 * ----------
 * 1. All 'O's that are connected to the border cannot be captured.
 * 2. Use DFS to mark all border-connected 'O's with a temporary marker (e.g., 'T').
 * 3. Traverse the entire board:
 *    - Convert 'T' back to 'O' (safe).
 *    - Convert remaining 'O's to 'X' (captured).
 */

function solveSurroundedRegions(board) {
    const m = board.length, n = board[0].length;

    // DFS to mark connected 'O's starting from border
    const dfs = (i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] !== 'O') return;
        board[i][j] = 'T'; // Mark as temporary safe
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    };

    // Start DFS from all border cells
    for (let i = 0; i < m; i++) {
        dfs(i, 0);
        dfs(i, n - 1);
    }
    for (let j = 0; j < n; j++) {
        dfs(0, j);
        dfs(m - 1, j);
    }

    // Flip captured 'O's to 'X' and revert temporary marks to 'O'
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            board[i][j] = board[i][j] === 'T' ? 'O' : 'X';
        }
    }
}

// Driver code to test solveSurroundedRegions
const board = [
    ['X','X','X','X'],
    ['X','O','O','X'],
    ['X','X','O','X'],
    ['X','O','X','X']
];

console.log("Before:");
board.forEach(row => console.log(row.join(' ')));

solveSurroundedRegions(board);

console.log("After:");
board.forEach(row => console.log(row.join(' ')));
// Expected Output:
// X X X X
// X X X X
// X X X X
// X O X X
