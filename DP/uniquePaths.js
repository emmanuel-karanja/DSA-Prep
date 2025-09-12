/*#*/
/**
 * Problem Definition:
 * -------------------
 * A robot is located at the top-left corner of an m x n grid.
 * The robot can only move either down or right at any point.
 * The robot tries to reach the bottom-right corner of the grid.
 * Return the total number of unique paths possible.
 *
 * Example:
 *   m = 3, n = 7
 *   Output: 28
 *
 * Intuition:
 * ----------
 * - Recursive: From a cell (i,j), the robot can come either from (i-1,j) or (i,j-1).
 *   The total paths to (i,j) is the sum of paths to its top and left neighbors.
 * - Dynamic Programming: Use a table to build solutions bottom-up and avoid
 *   recalculating overlapping subproblems.
 *
 * Approach 1: Recursive (Top-Down)
 * --------------------------------
 * Base cases:
 *   - If either m == 1 or n == 1, there’s only 1 path (all the way right or down).
 * Recurrence:
 *   - uniquePathsRec(m, n) = uniquePathsRec(m-1, n) + uniquePathsRec(m, n-1)
 * Complexity:
 *   - Time: O(2^(m+n)) without memoization (inefficient for large grids).
 *   - Space: O(m+n) recursion depth.
 */

function uniquePathsRec(m, n) {
    if (m === 1 || n === 1) return 1;
    return uniquePathsRec(m - 1, n) + uniquePathsRec(m, n - 1);
}

/**
 * Approach 2: Dynamic Programming (Bottom-Up)
 * ------------------------------------------
 * Build a DP table where dp[i][j] = dp[i-1][j] + dp[i][j-1].
 * Base initialization:
 *   - First row and first column are all 1 (only one way along edges).
 * Complexity:
 *   - Time: O(m * n)
 *   - Space: O(m * n)
 */

function uniquePaths(m, n) {
    const dp = Array.from({ length: m }, () => Array(n).fill(1));
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[m - 1][n - 1];
}

// -------- Driver Code --------
function main() {
    const m = 3, n = 7;

    const resultDP = uniquePaths(m, n);
    const resultRec = uniquePathsRec(m, n);

    console.log(`Grid size: ${m} x ${n}`);
    console.log(`Unique paths (DP): ${resultDP}`);  // Expected: 28
    console.log(`Unique paths (Recursive): ${resultRec}`); // Expected: 28
}

main();
