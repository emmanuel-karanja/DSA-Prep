function bfs(graph, startNode) {
    let queue = [startNode]; // Queue for BFS
    let visited = new Set(); // Set to track visited nodes
    let result = []; // Store BFS traversal order

    visited.add(startNode);

    while (queue.length > 0) {
        let node = queue.shift(); // Remove first node (FIFO)
        result.push(node);

        // Enqueue unvisited neighbors
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return result;
}

// Example graph represented as an adjacency list
const graph = {
    1: [2, 3],
    2: [4, 5],
    3: [6, 7],
    4: [],
    5: [8],
    6: [],
    7: [],
    8: []
};

console.log(bfs(graph, 1)); // Output: [1, 2, 3, 4, 5, 6, 7, 8] (BFS order)
