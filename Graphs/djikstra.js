/**Dijkstra’s algorithm finds the shortest path from a starting node to all other nodes in a 
 * weighted graph with non-negative edge weights.
 * 
 * Using MinHeap: O((V + E) * log V)
 *  */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(item) {
        this.heap.push(item);
        this.heap.sort((a, b) => a[0] - b[0]); // sort by distance
    }

    pop() {
        return this.heap.shift();
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

function dijkstra(graph, start) {
    const distances = {};
    const heap = new MinHeap();

    // Initialize all distances to Infinity
    for (let node in graph) {
        distances[node] = Infinity;
    }

    distances[start] = 0;
    heap.push([0, start]);

    while (!heap.isEmpty()) {
        const [dist, node] = heap.pop();

        for (let [neighbor, weight] of graph[node]) {
            const newDist = dist + weight;

            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                heap.push([newDist, neighbor]);
            }
        }
    }

    return distances;
}

const graph = {
    A: [['B', 1], ['C', 4]],
    B: [['D', 3]],
    C: [['D', 2]],
    D: []
};

console.log(dijkstra(graph, 'A'));
// Output: { A: 0, B: 1, C: 4, D: 4 }
