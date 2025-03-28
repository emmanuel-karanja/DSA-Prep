/**You are given a 2D grid where:

1 represents land
0 represents water

An island is made up of connected 1s horizontally or vertically.
Goal: Return the maximum area (number of connected 1s) of any island in the grid.\

LOGIC:

Modify Number of Islands problem to keep track of island area (number of connected 1s)

 */

function maxAreaOfIsland(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let maxArea = 0;

    function dfs(r, c) {
        // Base cases
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === 0) return 0;

        // Mark as visited
        grid[r][c] = 0;

        let area = 1; //denote the starting area
        area += dfs(r + 1, c);
        area += dfs(r - 1, c);
        area += dfs(r, c + 1);
        area += dfs(r, c - 1);
        return area;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                maxArea = Math.max(maxArea, dfs(r, c));
            }
        }
    }

    return maxArea;
}

const grid = [
  [0,0,1,0,0,0,0],
  [0,0,1,0,1,1,0],
  [0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0]
];

console.log(maxAreaOfIsland(grid)); // Output: 4
