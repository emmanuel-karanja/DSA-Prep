/**You're given a list of words that are sorted lexicographically according to the alphabet of an alien language. 
 * Your task is to determine the order of characters in that alien language.
 * 
 * If the words are sorted, then for every pair of adjacent words, you can infer 
 * a precedence rule between the first pair of differing characters.

    From all these rules, you can build a graph and use topological sorting to find a valid character order.

    Build the graph:

1. Nodes = all unique characters.
2. Edges = char1 → char2 (char1 comes before char2).

3. Build in-degree map:
    - Keeps track of how many characters must come before each character.
    - Topological sort using BFS (Kahn's algorithm):
    - Start with nodes that have in-degree 0.
4. Pop from queue, add to result, and reduce in-degree of neighbors.
*/

function alienOrder(words) {
    const graph = buildGraph(words);
    if (!graph) return ""; // invalid case like prefix issue
    return topologicalSort(graph);
}

// Step 1: Build the graph based on order of characters
function buildGraph(words) {
    const graph = new Map();

    // Initialize nodes
    for (const word of words) {
        for (const char of word) {
            if (!graph.has(char)) graph.set(char, new Set());
        }
    }

    // Build directed edges
    for (let i = 0; i < words.length - 1; i++) {
        const [first, second] = [words[i], words[i + 1]];
        if (first.length > second.length && first.startsWith(second)) {
            return null; // invalid input, prefix issue
        }

        for (let j = 0; j < Math.min(first.length, second.length); j++) {
            if (first[j] !== second[j]) {
                graph.get(first[j]).add(second[j]);
                break;
            }
        }
    }

    return graph;
}

// Step 2: Perform topological sort using DFS
function topologicalSort(graph) {
    const visited = new Map(); // 'visiting', 'visited'
    const result = [];

    for (const node of graph.keys()) {
        if (!dfs(node, graph, visited, result)) return ""; // cycle detected
    }

    return result.reverse().join('');
}

// Step 3: DFS helper for topological sort
function dfs(node, graph, visited, result) {
    if (visited.get(node) === 'visiting') return false; // cycle
    if (visited.get(node) === 'visited') return true;

    visited.set(node, 'visiting');
    for (const neighbor of graph.get(node)) {
        if (!dfs(neighbor, graph, visited, result)) return false;
    }
    visited.set(node, 'visited');
    result.push(node);

    return true;
}
