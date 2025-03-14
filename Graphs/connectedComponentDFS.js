/*A connected component is a subgraph where every node is reachable from any other node within that subgraph. 
If a graph has multiple disconnected parts, each part is a separate connected component.

 Logic:

 1. For each node in the graph.
 2. If the node has not been visited, do a depth first search on it passing an empty connected component holder.
 3. After dfs completes, add that component to the list of components.

*/
function findConnectedComponents(graph) {
    let visited = new Set();
    let components = [];

    function dfs(node, component) {
        visited.add(node);
        component.push(node);
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor, component);
            }
        }
    }

    for (let node in graph) {
        //check if we have visited this node to make sure it's not a part of a previous connected component
        if (!visited.has(node)) {
            let component = [];
            dfs(node, component); //do a dfs.
            components.push(component);
        }
    }

    return components;
}

// Example graph (Adjacency List Representation)
const graph = {
    1: [2],
    2: [1, 3],
    3: [2],
    4: [5],
    5: [4],
    6: []
};

console.log(findConnectedComponents(graph));
// Output: [ [ '1', '2', '3' ], [ '4', '5' ], [ '6' ] ]
