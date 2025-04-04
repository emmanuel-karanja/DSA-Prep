/**You are given a 2D binary grid (a grid of 0s and 1s) where there are exactly two islands.
 *  An island is a group of connected 1s (connected vertically or horizontally). 
 * Your task is to build the shortest bridge (flip 0s to 1s) to connect the two islands.
 * 
 * LOGIC:
 * 
1.Find and mark the first island.
2.Use DFS or BFS to locate and mark the first island (1s) and collect its edge coordinates.
3.Expand from the first island using BFS.
4. Use BFS starting from the perimeter of the first island, expanding layer by layer until you reach the second island
 (1 in the grid that isn’t visited).
5. The number of layers expanded is the shortest bridge length.
 */

function shortestBridge(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[1,0], [-1,0], [0,1], [0,-1]];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const queue = [];

    // Step 1: Find first island and mark it
    let found = false;
    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || visited[r][c] || grid[r][c] === 0) {
            return;
        }

        visited[r][c] = true;
        // This is the only twist in the DFS, adding the visited note to the queue with a distance of 0.
        queue.push([r, c, 0]); // Push to BFS queue with distance
        for (const [dr, dc] of directions) {
            dfs(r + dr, c + dc);
        }
    }

    for (let i = 0; i < rows && !found; i++) {
        for (let j = 0; j < cols && !found; j++) {
            if (grid[i][j] === 1) {
                dfs(i, j);
                found = true;
            }
        }
    }

    // Step 2: Expand with BFS until we reach second island
    while (queue.length > 0) {
        const [r, c, dist] = queue.shift();
        for (const [dr, dc] of directions) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && !visited[nr][nc]) {
                // exit as soon as you hit the 1. This is the most important part of this
                if (grid[nr][nc] === 1) {
                    return dist; // Reached second island, exit
                }
                visited[nr][nc] = true;
                queue.push([nr, nc, dist + 1]); //continue
            }
        }
    }

    return -1; // Should never happen with valid input
}


const grid = [
    [0,1,0],
    [0,0,0],
    [0,0,1]
  ];
  
  console.log(shortestBridge(grid)); // Output: 2
  