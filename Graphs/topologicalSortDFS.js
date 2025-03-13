/* Topolical sort is applied on Directed Acyclic Graphs to linearly order the vertices in their order . Note that a topological
   sort for a graph is not unique*/

function topologicalSortUtil(graph, node, visited, stack) {
    // Mark the current node as visited
    visited.add(node);

    // Recur for all the adjacent nodes, 
    if (graph[node]) {
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                topologicalSortUtil(graph, neighbor, visited, stack);
            }
        }
    }

    // Push current node to stack after visiting all neighbors, note that after the run,
    // the last node visited will be last and we'll need to reverse the stack to get the right sort.
    stack.push(node);
}

function topologicalSort(graph) {
    let visited = new Set();
    let stack = [];

    // Process each node in the graph
    for (let node in graph) {
        if (!visited.has(node)) {
            topologicalSortUtil(graph, node, visited, stack);
        }
    }

    // Reverse stack to get the correct order
    return stack.reverse();
}

// Example graph (Adjacency List Representation)
// The abstraction of the Graph within the code is importart. Here we use a HashMap the node is key and the
// array of values the nodes it connects to. This is called an Adjacency List
const graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
};

console.log(topologicalSort(graph)); // Output: [ 'A', 'C', 'B', 'D' ]
