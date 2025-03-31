/**To clone the graph:

1. Avoid infinite loops (in cyclic graphs)
2. Keep track of visited nodes using a map: original ➝ cloned
3. Traverse the graph (DFS or BFS)
    For each node:
      - Clone it if you haven’t already
      - Recursively clone its neighbors
      - Connect them accordingly
 */
 class Node {
        constructor(val, neighbors = []) {
            this.val = val;
            this.neighbors = neighbors;
        }
    }
    

function cloneGraph(node) {
    if (!node) return null;
    
    const cloned = new Map(); // original ➝ clone
    
    function dfs(current) {
        // has already been cloned
        if (cloned.has(current)) {
            //returns the clone
            return cloned.get(current);
        }
    
        // Clone the node (without neighbors for now)
        const clone = new Node(current.val);
        cloned.set(current, clone);
    
        // Recursively clone neighbors
        for (const neighbor of current.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }
    
        return clone;
    }
    
    return dfs(node);
}
         
// Build sample graph: A(1) — B(2) — C(3)
const node1 = new Node("A");
const node2 = new Node("B");
const node3 = new Node("C");

node1.neighbors = [node2, node3];
node2.neighbors = [node1, node3];
node3.neighbors = [node1, node2];

const cloned = cloneGraph(node1);
console.log(cloned);


/**Iterative */

class Node {
    constructor(val, neighbors = []) {
        this.val = val;
        this.neighbors = neighbors;
    }
}

var cloneGraph = function(node) {
    if (!node) return null;

    // Map to store cloned nodes
    let clones = new Map();
    clones.set(node, new Node(node.val));

    // Stack for DFS traversal
    let stack = [node];

    while (stack.length) {
        let current = stack.pop();

        for (let neighbor of current.neighbors) {
            if (!clones.has(neighbor)) {
                // Clone the neighbor if not already cloned
                clones.set(neighbor, new Node(neighbor.val));
                stack.push(neighbor);
            }

            // Connect the cloned node with its cloned neighbors
            clones.get(current).neighbors.push(clones.get(neighbor));
        }
    }

    return clones.get(node);
};

