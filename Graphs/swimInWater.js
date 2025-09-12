/*#*/
/**
 * Problem Definition:
 * -------------------
 * You are given an n x n grid where the value grid[i][j] indicates the elevation at that point.
 * Water rises over time t. At time t, you can enter any square with elevation ≤ t.
 * Starting at the top-left corner (0,0), return the minimum time t required 
 * to reach the bottom-right corner (n-1,n-1).
 * (LeetCode 778: Swim in Rising Water)
 *
 * Example:
 *   grid = [
 *     [0,2],
 *     [1,3]
 *   ]
 *   Output: 3
 *
 * Intuition:
 * ----------
 * Model the grid as a weighted graph where each cell is a node and edges represent 
 * movement to adjacent cells. The "weight" of a path is determined by the highest 
 * elevation encountered so far. Use a **Dijkstra-like** approach:
 * - Always expand the lowest-elevation option first (min-heap).
 * - Update the maximum elevation encountered on the path.
 *
 * Logic:
 * ------
 * 1. Initialize a min-heap with [grid[0][0], 0, 0] (elevation, x, y) and a visited matrix.
 * 2. Pop the lowest elevation cell from the heap:
 *    - If it's the bottom-right cell, return its elevation as the minimum time.
 *    - Mark it visited.
 *    - For each neighbor (up, down, left, right):
 *        * If not visited, push into the heap with elevation = max(current path elevation, neighbor’s value).
 * 3. Continue until destination is reached.
 *
 * Complexity:
 * -----------
 * Time: O(n² log n²) = O(n² log n) due to sorting heap operations.
 * Space: O(n²) for visited and heap.
 */

function swimInWater(grid) {
    const n = grid.length;
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const heap = new MinHeap([grid[0][0], 0, 0]); // [elevation, x, y]
    const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    while (heap.length) {
        // Pop the cell with the lowest elevation (simulated min-heap using sort)
        heap.sort((a, b) => a[0] - b[0]);
        const [h, x, y] = heap.shift();

        if (x === n - 1 && y === n - 1) return h; // Reached destination

        if (visited[x][y]) continue;
        visited[x][y] = true;

        for (const [dx, dy] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < n && ny < n && !visited[nx][ny]) {
                heap.push([Math.max(h, grid[nx][ny]), nx, ny]);
            }
        }
    }
}

// -------- Driver Code --------
function main() {
    const grid = [
        [0, 2],
        [1, 3]
    ];
    const result = swimInWater(grid);
    console.log("Grid:");
    console.log(grid.map(row => row.join(' ')).join('\n'));
    console.log(`Minimum time to reach destination: ${result}`); // Expected: 3
}

main();
