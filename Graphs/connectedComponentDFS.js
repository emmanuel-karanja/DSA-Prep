/*A connected component is a subgraph where every node is reachable from any other node within that subgraph. 
If a graph has multiple disconnected parts, each part is a separate connected component.*/
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
        if (!visited.has(node)) {
            let component = [];
            dfs(node, component);
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
