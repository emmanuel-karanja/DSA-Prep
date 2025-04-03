/**You are given an m × n grid grid where:

'1' represents land
'0' represents water
An island is formed by connecting adjacent land cells ('1') horizontally or vertically.
Find the number of distinct islands in the grid.

Clue: Treat each cell as a node in a graph. It's connected to 4 neighbours left, right, bottom top

Basically, if you find a 1 you check the neighbours, if any of them is a 1, you continue doing the same

LOGIC:

1. Iterate the matrix 
2. Do a DFS on any cell found to be '1' and increment island count


TWIST: It could be 1 represents land and 0 water and you are asked to count the body of waters.*/

function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    let numIslands = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    function dfs(r, c) {
        //check that we are not out of bounds.
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c]==='0') return;
        
        //else visit it.
        grid[r][c] = '0'; // Mark as visited, you can label it as anything including two

        // Visit all four directions
        dfs(r + 1, c); // Down
        dfs(r - 1, c); // Up
        dfs(r, c + 1); // Right
        dfs(r, c - 1); // Left
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            //if we counter a 1, we DFS
            if (grid[r][c] === '1') { //we only explore when we find land.
                numIslands++;
                dfs(r, c); // Explore the island
            }
        }
    }

    return numIslands;
}

//using BFS
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    let numIslands = 0;
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // Down, Up, Right, Left

    function bfs(r, c) {
        let queue = [[r, c]];
        grid[r][c] = '0'; // Mark as visited

        while (queue.length > 0) {
            let [x, y] = queue.shift();

            for (let [dx, dy] of directions) {
                let newX = x + dx;
                let newY = y + dy;

                if (newX >= 0 && newY >= 0 && newX < rows && newY < cols && grid[newX][newY] === '1') {
                    queue.push([newX, newY]);
                    grid[newX][newY] = '0'; // Mark as visited
                }
            }
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                numIslands++;
                bfs(r, c); // Explore the island
            }
        }
    }

    return numIslands;
}
