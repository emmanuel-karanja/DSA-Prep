function dfs(graph, startNode) {
    let stack = [startNode]; // Stack for DFS
    let visited = new Set(); // Set to track visited nodes
    let result = []; // Store DFS traversal order

    while (stack.length > 0) {
        let node = stack.pop(); // Remove last node from stack (LIFO)

        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);

            // Push unvisited neighbors onto the stack
            for (let neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
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

console.log(dfs(graph, 1)); // Output: [1, 3, 7, 6, 2, 5, 8, 4] (DFS order)
