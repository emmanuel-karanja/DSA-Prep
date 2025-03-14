/*A way to understand inDegree, it's basically, the number of edges incident/incoming into the current node

 LOGIC:

 1. For each node in the graph, Initialize a key-value pair holder of node=>inDegree, initializing
    to zero.
 2. For each node in the graph, get the neighbours and for each neighbour, update the inDegree.
 3. 

*/

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
