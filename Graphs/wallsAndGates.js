/**ou are given a 2D grid representing rooms in a building. Each cell can be:
-1: A wall or obstacle
0: A gate
INF (2³¹ - 1): An empty room (you can use Infinity in JS)

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should remain INF. 

LOGIC:
1. Add all gates (0s) to a queue as starting points.
2. Run BFS from these gates simultaneously.
3. As you expand, fill the grid with distances to the nearest gate.

Walls and visited cells are skipped.

If you did BFS from every room, you’d do a lot of redundant work. Instead, BFS from all gates at once, 
and each room gets updated when first reached (i.e., from the nearest gate).



*/
function wallsAndGates(rooms) {
    if (!rooms || rooms.length === 0) return;

    const rows = rooms.length;
    const cols = rooms[0].length;
    const directions = [[1,0], [-1,0], [0,1], [0,-1]];
    const queue = [];

    const INF = 2 ** 31 - 1;

    // Step 1: Collect all gates
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (rooms[r][c] === 0) {
                queue.push([r, c]);
            }
        }
    }

    // Step 2: BFS from all gates
    while (queue.length > 0) {
        const [r, c] = queue.shift();
        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&rooms[nr][nc] === INF) {
                rooms[nr][nc] = rooms[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    }
}
