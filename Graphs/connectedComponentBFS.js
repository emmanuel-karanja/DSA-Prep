/*A connected component is a subgraph where every node is reachable from any other node within that subgraph. 
If a graph has multiple disconnected parts, each part is a separate connected component.

LOGIC

1. 

*/

function findConnectedComponentsBFS(graph) {
    let visited = new Set();
    let components = [];

    function bfs(startNode) {
        let queue = [startNode];
        let component = [];
        visited.add(startNode);

        while (queue.length > 0) {
            let node = queue.shift();
            component.push(node);

            for (let neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

       /*When the loop exists an entire connected component has been searched if it happens the current
         node has already been visited, the exit is early*/
        
        return component;
    }

    for (let node in graph) {
        if (!visited.has(node)) {
            /*In this case bfs gathers all components that belong there and has an early return if node is
             already visited*/
            components.push(bfs(node));
        }
    }

    return components;
}

console.log(findConnectedComponentsBFS(graph));
// Output: [ [ '1', '2', '3' ], [ '4', '5' ], [ '6' ] ]
