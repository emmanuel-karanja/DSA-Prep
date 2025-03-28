/**You are given a target coordinate (x, y) on an infinite chessboard. A knight starts at (0, 0).
Return the minimum number of moves it takes to reach (x, y) using legal knight moves.

>A knight moves in an "L" shape: 2 in one direction, then 1 in perpendicular. So from any cell (r, c), it can go to 8 positions:

const moves = [
  [2, 1], [1, 2], [-1, 2], [-2, 1],
  [-2, -1], [-1, -2], [1, -2], [2, -1]
];

The board is infinite, so you can't use a fixed-size grid.
You can use a Set to track visited positions.
The board is symmetric around the origin, so you can mirror to the first quadrant 
 (i.e., treat all x, y as absolute positive values) to reduce search space.

BFS is perfect here because all moves cost the same, and we want the shortest path.

HACK->Only three things:
*if it was another piece, we only need to change the bounds and directions
1. The directions
2. The bounds i.e nc >-2 and nr >-2 
3. Keep track of
*/

function minKnightMoves(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);

    const directions = [
        [2, 1], [1, 2], [-1, 2], [-2, 1],
        [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];

    const visited = new Set();
    const queue = [[0, 0, 0]]; // x, y, steps

    while (queue.length > 0) {
        const [cx, cy, steps] = queue.shift();
        if (cx === x && cy === y) return steps;

        for (const [dx, dy] of directions) {
            const nx = cx + dx;
            const ny = cy + dy;

            // Stay within a reasonable bound due to symmetry
            if (nx >= -2 && ny >= -2 && !visited.has(`${nx},${ny}`)) {
                visited.add(`${nx},${ny}`);
                queue.push([nx, ny, steps + 1]);
            }
        }
    }
}

minKnightMoves(5, 5); // returns 4
