/**You're given a 2D grid where each cell can be:

0: Empty cell
1: Fresh orange
2: Rotten orange

Rules:

1.Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
2.Return the minimum number of minutes needed until no cell has a fresh orange.
3.If it is impossible to rot all fresh oranges, return -1.

LOGIC
This is a multi-source BFS problem because multiple rotten oranges can start rotting their neighbors at the same time.

Steps:
1. Add all initially rotten oranges (value = 2) to a queue, with time = 0.
2. Count total fresh oranges.

Run BFS:

1. For each rotten orange in the queue, rot adjacent fresh oranges.
2. Add newly rotten oranges to the queue with time + 1.
3. Decrease the fresh count.
4. After BFS, if fresh count > 0 → return -1; else, return total minutes passed.

 */
function orangesRotting(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[1,0], [-1,0], [0,1], [0,-1]];
    const queue = [];
    let freshCount = 0;
    let minutes = 0;

    // Step 1: Initialize queue with all rotten oranges
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c, 0]); // Add initial rotten orange with time = 0
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }

    // Step 2: BFS to rot adjacent fresh oranges
    while (queue.length > 0) {
        const [r, c, time] = queue.shift();
        //keep track of total minutes
        minutes = Math.max(minutes, time);

        for (const [dr, dc] of directions) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                grid[nr][nc] = 2; // Rot it
                freshCount--;
                queue.push([nr, nc, time + 1]);
            }
        }
    }

    return freshCount === 0 ? minutes : -1;
}

const grid = [
    [2,1,1],
    [1,1,0],
    [0,1,1]
  ];
  
  console.log(orangesRotting(grid)); // Output: 4
  