/*#*/
/**
 * Problem Definition:
 * -------------------
 * You are given n points on a 2D plane where points[i] = [xi, yi].
 * The cost to connect two points is their Manhattan distance: 
 *    dist(i, j) = |xi - xj| + |yi - yj|.
 * Return the minimum cost to connect all points so that there is exactly one simple path 
 * between any two points. 
 * (LeetCode 1584: Min Cost to Connect All Points)
 *
 * Example:
 *   points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
 *   Output: 20
 *
 * Intuition:
 * ----------
 * This is a classic **Minimum Spanning Tree (MST)** problem on a complete graph.
 * Use **Prim’s algorithm**:
 * - Start from any point (node).
 * - Greedily pick the smallest edge connecting the visited set to an unvisited point.
 * - Repeat until all points are connected.
 *
 * Logic:
 * ------
 * 1. Initialize:
 *    - visited array of length n.
 *    - Min-heap priority queue with [0,0] (cost,node) to start.
 *    - res = 0 (total cost), count = 0 (visited nodes count).
 * 2. While count < n:
 *    - Pop the smallest cost edge from the heap.
 *    - If the node is already visited, skip.
 *    - Mark it visited, add its cost to res, increment count.
 *    - For each unvisited neighbor, push [dist(u,v), v] to the heap.
 * 3. Return res.
 *
 * Complexity:
 * -----------
 * - Time: O(n² log n) since for each node we push up to n edges into a min-heap.
 * - Space: O(n²) for the heap in the worst case.
 */

function minCostConnectPoints(points) {
    const n = points.length;
    const visited = Array(n).fill(false);
    const heap = [[0, 0]]; // [cost, node]
    let res = 0, count = 0;

    function dist(i, j) {
        return Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
    }

    while (count < n) {
        // Extract smallest edge from min-heap
        heap.sort((a, b) => a[0] - b[0]);
        const [cost, u] = heap.shift();

        if (visited[u]) continue; // Skip if already visited
        visited[u] = true;
        res += cost;
        count++;

        // Add edges from current node to all unvisited nodes
        for (let v = 0; v < n; v++) {
            if (!visited[v]) {
                heap.push([dist(u, v), v]);
            }
        }
    }

    return res;
}

// -------- Driver Code --------
function main() {
    const points = [[0,0],[2,2],[3,10],[5,2],[7,0]];
    const result = minCostConnectPoints(points);
    console.log("Points:", points.map(p => `[${p}]`).join(', '));
    console.log(`Minimum cost to connect all points: ${result}`); // Expected: 20
}

main();
