/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given a 2D board and a word, check if the word exists in the grid.
 * 
 * - The word can be constructed from letters of sequentially adjacent cells, 
 *   where "adjacent" cells are horizontally or vertically neighboring.
 * - The same letter cell may not be used more than once.
 * 
 * Example:
 * ----------
 * Input: 
 * board = [
 *   ['A','B','C','E'],
 *   ['S','F','C','S'],
 *   ['A','D','E','E']
 * ], word = "ABCCED"
 * Output: true
 * 
 * Input: word = "SEE"
 * Output: true
 * 
 * Input: word = "ABCB"
 * Output: false
 * 
 * Intuition:
 * ----------
 * 1. Perform DFS starting from each cell in the board.
 * 2. At each step, check if the current cell matches the corresponding character in the word.
 * 3. Mark the cell as visited (e.g., with a temporary marker) to avoid revisiting.
 * 4. Explore all four directions (up, down, left, right).
 * 5. If we match all characters, return true; otherwise backtrack and continue.
 */

function existWord(board, word) {
    const m = board.length, n = board[0].length;

    // DFS helper function
    const dfs = (i, j, idx) => {
        // If all characters are matched
        if (idx === word.length) return true;

        // Check boundaries and character match
        if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] !== word[idx]) return false;

        // Mark current cell as visited
        const tmp = board[i][j];
        board[i][j] = '#';

        // Explore all four directions
        const res = dfs(i+1, j, idx+1) || dfs(i-1, j, idx+1) ||
                    dfs(i, j+1, idx+1) || dfs(i, j-1, idx+1);

        // Backtrack: restore original character
        board[i][j] = tmp;
        return res;
    };

    // Start DFS from every cell
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }

    return false;
}

// Driver code to test existWord
const board = [
    ['A','B','C','E'],
    ['S','F','C','S'],
    ['A','D','E','E']
];

const testCases = [
    { word: "ABCCED", expected: true },
    { word: "SEE", expected: true },
    { word: "ABCB", expected: false }
];

testCases.forEach(({word, expected}, i) => {
    const result = existWord(board.map(row => [...row]), word); // copy board for each test
    console.log(`Test Case ${i + 1}: Word = "${word}", Expected = ${expected}, Got = ${result}`);
});
