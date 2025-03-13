/*A way to understand inDegree, it's basically, the number of edges incident/incoming into the current node */

function computeInDegree(graph) {
    let inDegree = {}; // Store in-degree counts

    // Initialize in-degree for each node
    for (let node in graph) {
        inDegree[node] = 0;
    }

    // Calculate in-degree by counting incoming edges
    for (let node in graph) {
        for (let neighbor of graph[node]) {
            inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
        }
    }

    return inDegree;
}

// Example Graph (Adjacency List)
const graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
};

console.log(computeInDegree(graph)); 
// Output: { A: 0, B: 1, C: 1, D: 2 }
