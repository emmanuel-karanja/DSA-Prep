/* This is also called Kahn's algorithm and it keeps track of how many edges are incident on the current node.

LOGIC
1. Compute the inDegree of the graph nodes.
2. Push all nodes with an inDegree of zero into a queue.
3. Perform BFS on the graph using the queue. i.e. 
     -deque(shift a node)
     -add it to the result
     -get the neighbours of the node and check if they are visited if not,
     -for each neighbour, decrement the inDegree, if it's zero add that node to the queue.
*/

function topologicalSortBFS(graph) {
    let inDegree = {};  // Stores in-degree of each node
    let queue = [];     // Queue for BFS
    let result = [];    // Stores the sorted order

    function computeInDegree(graph) {
        let inDegree = {}; // Store in-degree counts
    
        // Initialize in-degree for each node
        for (let node in graph) {
            inDegree[node] = 0;
        }
    
        // Calculate in-degree by counting incoming edges
        for (let node in graph) {
            let neighbours=graph[node];
            if(neighbours){
                for (let neighbor of neighbours) {
                    inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
                }
            }
        }
    
        return inDegree;
    }

    inDegree=computeInDegree(graph);

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
        let neighbours=graph[current]
        for (let neighbor of neighbours) {
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
