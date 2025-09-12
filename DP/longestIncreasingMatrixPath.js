/*#*/
/**
 * Problem Definition:
 * -------------------
 * Given an m x n integer matrix, return the length of the longest strictly increasing path.
 * You can move in four directions: up, down, left, or right.
 * (LeetCode 329: Longest Increasing Path in a Matrix)
 *
 * Example:
 *   matrix = [
 *     [9,9,4],
 *     [6,6,8],
 *     [2,1,1]
 *   ]
 *   Output: 4
 *   Explanation: The longest path is [1, 2, 6, 9].
 *
 * Intuition:
 * ----------
 * Use DFS to explore all paths starting from each cell, but cache results (memoization) 
 * to avoid recomputing for overlapping subproblems.
 * If a neighbor has a greater value, continue DFS to extend the path.
 * Keep track of the longest path found so far.
 *
 * Logic:
 * ------
 * 1. Create a memo table `memo[m][n]` initialized to 0.
 * 2. Define directions `dirs` for movement in 4 directions.
 * 3. DFS(x, y):
 *    - If memo[x][y] > 0, return cached value.
 *    - Initialize maxLen = 1 (the cell itself).
 *    - For each neighbor (nx, ny):
 *        a. Check bounds and ensure matrix[nx][ny] > matrix[x][y].
 *        b. Recurse: maxLen = max(maxLen, 1 + dfs(nx, ny)).
 *    - Cache and return maxLen.
 * 4. Loop through all cells, compute dfs(i, j), and track the global maximum.
 * 5. Return the global maximum as the result.
 */

function longestIncreasingPath(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const memo = Array.from({ length: m }, () => Array(n).fill(0));
    const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    function dfs(x, y) {
        if (memo[x][y]) return memo[x][y]; // Return cached result
        let maxLen = 1;
        for (const [dx, dy] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < m && ny < n && matrix[nx][ny] > matrix[x][y]) {
                maxLen = Math.max(maxLen, 1 + dfs(nx, ny));
            }
        }
        memo[x][y] = maxLen; // Cache result
        return maxLen;
    }

    let res = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            res = Math.max(res, dfs(i, j));
        }
    }
    return res;
}

// -------- Driver Code --------
function main() {
    const matrix = [
        [9, 9, 4],
        [6, 6, 8],
        [2, 1, 1]
    ];
    const result = longestIncreasingPath(matrix);
    console.log("Matrix:");
    console.log(matrix.map(row => row.join(' ')).join('\n'));
    console.log(`Longest Increasing Path Length: ${result}`); // Expected: 4
}

main();
