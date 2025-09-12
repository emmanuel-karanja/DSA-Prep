/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given n nodes labeled from 0 to n-1 and a list of edges, 
 * determine if these edges make up a valid tree.
 * 
 * A valid tree must satisfy:
 * 1. It is connected (all nodes are reachable).
 * 2. It contains no cycles.
 * 
 * Example:
 * ----------
 * Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
 * Output: true
 * 
 * Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
 * Output: false
 * 
 * Intuition:
 * ----------
 * 1. For a tree with n nodes, there must be exactly n-1 edges.
 * 2. Use Union-Find to detect cycles efficiently:
 *    - Initialize each node as its own parent.
 *    - For each edge [u,v], union them.
 *    - If u and v are already connected, there is a cycle → not a tree.
 * 3. If edges.length !== n-1 → not connected or too many edges → not a tree.
 */

function validTree(n, edges) {
    // A tree must have exactly n-1 edges
    if (edges.length !== n - 1) return false;

    // Initialize Union-Find
    const parent = Array.from({ length: n }, (_, i) => i);

    // Find with path compression
    const find = x => { 
        if (parent[x] === x) return x;
        parent[x] = find(parent[x]);
        return parent[x];
    };

    // Union edges
    for (const [u, v] of edges) {
        const pu = find(u), pv = find(v);
        if (pu === pv) return false; // Cycle detected
        parent[pu] = pv;            // Union
    }

    return true; // No cycles and n-1 edges → valid tree
}

// Driver code to test validTree
const testCases = [
    { n: 5, edges: [[0,1],[0,2],[0,3],[1,4]], expected: true },
    { n: 5, edges: [[0,1],[1,2],[2,3],[1,3],[1,4]], expected: false },
    { n: 4, edges: [[0,1],[2,3]], expected: false }
];

testCases.forEach(({n, edges, expected}, i) => {
    const result = validTree(n, edges);
    console.log(`Test Case ${i + 1}: Expected = ${expected}, Got = ${result}`);
});
