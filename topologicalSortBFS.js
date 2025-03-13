/* This is also called Kahn's algorithm and it keeps track of how many edges are incident on the current node */

function topologicalSortBFS(graph) {
    let inDegree = {};  // Stores in-degree of each node
    let queue = [];     // Queue for BFS
    let result = [];    // Stores the sorted order

    // Initialize in-degree of all nodes to 0
    for (let node in graph) {
        inDegree[node] = 0;
    }

    // Compute in-degree of each node
    for (let node in graph) {
        for (let neighbor of graph[node]) {
            inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
        }
    }

    // Add nodes with in-degree 0 to the queue
    for (let node in inDegree) {
        if (inDegree[node] === 0) {
            queue.push(node);
        }
    }

    // Process nodes in queue
    while (queue.length > 0) {
        let current = queue.shift(); // Remove from front of queue
        result.push(current);

        // Reduce in-degree of neighbors and add to queue if in-degree becomes 0
        for (let neighbor of graph[current]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    // If sorted order does not contain all nodes, there is a cycle
    if (result.length !== Object.keys(graph).length) {
        throw new Error("Graph has a cycle! Topological sorting is not possible.");
    }

    return result;
}

// Example graph (Adjacency List)
const graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
};

console.log(topologicalSortBFS(graph)); // Output: [ 'A', 'B', 'C', 'D' ] (or similar valid order)
