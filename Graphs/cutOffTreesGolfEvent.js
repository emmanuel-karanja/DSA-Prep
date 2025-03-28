/**You're in a forest, represented as a 2D grid. Each cell contains:

0: obstacle (impassable)
1: empty ground (walkable)
>1: a tree, with the number representing its height

You’re at position (0, 0), and you must cut down all trees in increasing order of height.
You can only move up, down, left, or right, and you can't walk through obstacles.

Your goal is to find the minimum total steps needed to cut all the trees in order. 
If it's not possible to reach any tree, return -1.

LOGIC:
1.Collect all trees with their positions and heights.
2.Sort the trees by height.
3. Use BFS (Breadth-First Search) to calculate minimum steps from your current position to the next tree.
4. Add steps to a running total.

If any tree is unreachable, return -1.

EDGE : If (0, 0) is an obstacle (0), you can’t even begin — return -1.
*/

function cutOffTree(forest) {
    const rows = forest.length;
    const cols = forest[0].length;
    
    // Get all trees with height > 1
    const trees = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (forest[r][c] > 1) {
                let height=forest[r][c];
                trees.push([height, r, c]);
            }
        }
    }

    // Sort trees by height
    trees.sort((a, b) => a[0] - b[0]);

    // BFS function to find shortest path between two points
    function bfs(sr, sc, tr, tc) {
        if (sr === tr && sc === tc) return 0;
        
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        const queue = [[sr, sc, 0]]; // [row, col, steps]
        visited[sr][sc] = true;

        const directions = [[1,0], [-1,0], [0,1], [0,-1]];

        while (queue.length > 0) {
            const [r, c, steps] = queue.shift();

            for (let [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;

                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && forest[nr][nc] !== 0) {
                    if (nr === tr && nc === tc) {
                        return steps + 1;
                    }

                    visited[nr][nc] = true;
                    queue.push([nr, nc, steps + 1]);
                }
            }
        }

        return -1; // unreachable
    }

    // Starting point
    let totalSteps = 0;
    let sr = 0, sc = 0;

    for (let [_, tr, tc] of trees) {
        const steps = bfs(sr, sc, tr, tc);
        if (steps === -1) return -1;

        totalSteps += steps;
        sr = tr;
        sc = tc;
    }

    return totalSteps;
}

console.log(cutOffTree([
    [1, 2, 3],
    [0, 0, 4],
    [7, 6, 5]
   ])); // ➞ 6

