/*#*/
/**
 * Problem Statement:
 * -----------------
 * In a connected undirected graph with n nodes labeled from 1 to n, 
 * there is exactly one extra edge that creates a cycle.
 * 
 * Given a list of edges where each edge = [u, v], return the edge that can be removed to make the graph a tree.
 * If there are multiple answers, return the one that appears last in the input.
 * 
 * Example:
 * ----------
 * Input: edges = [[1,2],[1,3],[2,3]]
 * Output: [2,3]
 * 
 * Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
 * Output: [1,4]
 * 
 * Intuition:
 * ----------
 * 1. Use Union-Find (Disjoint Set Union, DSU) to detect cycles efficiently.
 * 2. Initialize each node as its own parent.
 * 3. For each edge [u, v]:
 *    - If u and v have the same root, adding this edge creates a cycle → it's redundant.
 *    - Otherwise, union u and v.
 * 4. Return the first edge detected that forms a cycle.
 */

function findRedundantConnection(edges) {
    const parent = [];

    // Find with path compression
    const find = (x) => { 
        if (parent[x] === x) return x; 
        parent[x] = find(parent[x]); 
        return parent[x]; 
    };

    // Union two sets; return false if they are already connected
    const union = (x, y) => {
        const px = find(x), py = find(y);
        if (px === py) return false; // Cycle detected
        parent[px] = py;
        return true;
    };

    // Initialize parent array (1-based indexing)
    for (let i = 0; i <= edges.length; i++) parent[i] = i;

    // Process all edges
    for (const [u, v] of edges) {
        if (!union(u, v)) return [u, v]; // Redundant edge detected
    }
}

// Driver code to test findRedundantConnection
const testCases = [
    { edges: [[1,2],[1,3],[2,3]], expected: [2,3] },
    { edges: [[1,2],[2,3],[3,4],[1,4],[1,5]], expected: [1,4] },
    { edges: [[1,2],[2,3],[3,1]], expected: [3,1] }
];

testCases.forEach(({edges, expected}, i) => {
    const result = findRedundantConnection(edges);
    console.log(`Test Case ${i + 1}: Expected = [${expected}], Got = [${result}]`);
});
