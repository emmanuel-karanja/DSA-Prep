/*#*/
/**
 * Problem Definition:
 * -------------------
 * There are n cities connected by flights. flights[i] = [u, v, w] means there is a flight 
 * from city u to city v with cost w. Given the number of cities n, the list of flights, 
 * a source city src, a destination city dst, and an integer K (maximum allowed stops), 
 * return the cheapest price from src to dst with at most K stops. If there is no such route, return -1.
 * (LeetCode 787: Cheapest Flights Within K Stops)
 *
 * Example:
 *   n = 4, flights = [[0,1,100],[1,2,100],[2,3,100],[0,2,500]],
 *   src = 0, dst = 3, K = 1
 *   Output: 600
 *
 * Intuition:
 * ----------
 * Perform a BFS-like traversal where each layer represents an additional stop. Track:
 * - current city,
 * - accumulated cost,
 * - number of stops so far.
 * Always expand paths only if they do not exceed K stops.
 * Keep track of the minimum cost found to reach dst.
 *
 * Logic:
 * ------
 * 1. Build an adjacency list `adj` for the graph from flights.
 * 2. Use a queue for BFS: each element = [node, cost, stops].
 * 3. Initialize queue with [src, 0, 0] (starting at src, cost 0, stops 0).
 * 4. While the queue is not empty:
 *    - Pop front: [node, cost, stops].
 *    - If node === dst, update res = min(res, cost).
 *    - If stops > K, skip further expansion.
 *    - For each neighbor nei with weight w, push [nei, cost+w, stops+1].
 * 5. Return -1 if res was never updated; else return res.
 *
 * Complexity:
 * -----------
 * - Time: O(E) in worst case (edges processed multiple times depending on stops).
 * - Space: O(V + E) for adjacency list and queue.
 */

function findCheapestPrice(n, flights, src, dst, K) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, w] of flights) {
        adj[u].push([v, w]);
    }

    let q = [[src, 0, 0]]; // [current node, total cost, stops used]
    let res = Infinity;

    while (q.length) {
        const [node, cost, stops] = q.shift();

        if (node === dst) {
            res = Math.min(res, cost);
        }

        if (stops > K) continue;

        for (const [nei, w] of adj[node]) {
            q.push([nei, cost + w, stops + 1]);
        }
    }

    return res === Infinity ? -1 : res;
}

// -------- Driver Code --------
function main() {
    const n = 4;
    const flights = [[0,1,100],[1,2,100],[2,3,100],[0,2,500]];
    const src = 0, dst = 3, K = 1;

    const result = findCheapestPrice(n, flights, src, dst, K);
    console.log(`Flights: ${JSON.stringify(flights)}`);
    console.log(`Cheapest price from ${src} to ${dst} with at most ${K} stops: ${result}`); 
    // Expected: 600
}

main();
