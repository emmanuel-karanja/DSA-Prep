/**You’re given a 2D grid of 0s (water) and 1s (land).
An island is a group of 1s connected horizontally or vertically.

Task:
Return the number of distinct islands, where two islands are considered the same if they have the same shape, 
even if they're located in different places.

INTUTION
We need to identify unique shapes of islands.
Two islands are the same if their shapes match when you align them to a common origin. This means:
We don't care where they are,
Only how the 1s are arranged relative to the starting point.

LOGIC:
Traverse the grid.
  1.When you find a 1, do DFS and record the relative path from the start cell.
  2. Convert the path into a string or tuple and add it to a Set (to track uniqueness).
At the end, the size of the set is your answer.
*/

function numDistinctIslands(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const shapes = new Set();

    function dfs(r, c, direction, path) {
        // Bounds & base case
        if ( r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === 0) return;

        // Mark visited
        grid[r][c] = 0;

        path.push(direction);

        dfs(r + 1, c, 'D', path); // Down
        dfs(r - 1, c, 'U', path); // Up
        dfs(r, c + 1, 'R', path); // Right
        dfs(r, c - 1, 'L', path); // Left

        //this is added here, this is what holds the structural info together 
        path.push('B'); // Backtrack, fully explored
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                const path = [];
                dfs(r, c, 'S', path); // S = Start
                console.log(path)
                shapes.add(path.join(''));
                console.log(shapes)
            }
        }
    }

    return shapes.size;
}

const grid = [
    [1,1,0,0,0],
    [1,0,0,0,0],
    [0,0,0,1,1],
    [0,0,0,1,1]
  ];
  
  console.log(numDistinctIslands(grid)); // Output: 1
  