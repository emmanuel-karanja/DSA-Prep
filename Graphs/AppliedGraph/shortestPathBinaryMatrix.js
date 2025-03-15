/*Given an n×n binary matrix grid, where:

0 represents an open cell (can be traversed).
1 represents a blocked cell (cannot be traversed).
Find the shortest path from the top-left cell (0,0) to the bottom-right cell (n-1,n-1), 
moving in 8 possible directions (including diagonals). Return the length of the shortest path. 
If no path exists, return -1.

LOGIC: Use BFS  on the Matrix

Edge Cases

1. If grid[0][0] == 1 or grid[n-1][n-1] == 1, return -1 (no possible path).
2. If n == 1 and grid[0][0] == 0, return 1 (starting point is also the endpoint).

Initialize BFS

1. Use a queue ([row, col, steps]) to track position and path length.
2. Mark visited cells. Set them to blocked
4. Explore 8 Directions

5. Move up, down, left, right, and diagonals.
6. Ensure moves are within bounds and go only through open cells (0s).
7. Stop When Reaching (n-1, n-1)

8. The first time we reach bottom-right, return the steps.
*/

function shortestPathBinaryMatrix(grid) {
    let n = grid.length;
    
    // Edge case: Start or end is blocked, so you can't even start
    if (grid[0][0] === 1 || grid[n-1][n-1] === 1) return -1;

    let directions = [
        [-1, -1], [-1, 0], [-1, 1], 
        [0, -1],           [0, 1], 
        [1, -1],  [1, 0],  [1, 1]
    ];

    let queue = [[0, 0, 1]]; // [row, col, steps]
    grid[0][0] = 1; // Mark visited
    
    while (queue.length > 0) {
        //I like this!
        let [r, c, steps] = queue.shift();
        
        // If we reach the bottom-right corner, return steps
        if (r === n-1 && c === n-1) return steps;

        //Generate the neighbours
        for (let [dr, dc] of directions) {
            let newRow = r + dr, newCol = c + dc;
            
            // Check if within bounds and not visited
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n && grid[newRow][newCol] === 0) {
                queue.push([newRow, newCol, steps + 1]);
                //visit
                grid[newRow][newCol] = 1; // Mark as visited
            }
        }
    }
    
    return -1; // No path found
}

// Example Usage
console.log(shortestPathBinaryMatrix([
  [0,1],
  [1,0]
]));  // Output: 2
