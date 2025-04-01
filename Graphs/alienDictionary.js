/**You're given a list of words that are sorted lexicographically according to the alphabet of an alien language. 
 * Your task is to determine the order of characters in that alien language.
 * 
 * If the words are sorted, then for every pair of adjacent words, you can infer 
 * a precedence rule between the first pair of differing characters.

    From all these rules, you can build a graph and use topological sorting to find a valid character order.

1. Build a graph (Directed Acyclic Graph - DAG)
     - Each character is a node.
     - If a character x comes before y in two adjacent words, create a directed edge x → y.
     - Keep track of in-degree (how many times a character depends on another).
2. Topological Sorting (Kahn’s Algorithm - BFS)
     - Use a queue to process characters with an in-degree of 0 (independent characters).
     - Append each processed character to the result.
     - Decrease the in-degree of its neighbors.
     - If a cycle is detected (not all nodes are processed), return "" (invalid order)

Time O(C+V+E)  C is the sum of characters across the words
*/

function buildGraph(words) {
    let graph = new Map();
    let inDegree = new Map();

    // Initialize graph with unique characters
    for (let word of words) {
        for (let char of word) {
            if (!graph.has(char)) graph.set(char, new Set());
            if (!inDegree.has(char)) inDegree.set(char, 0);
        }
    }

    // Add directed edges based on precedence rules
    for (let i = 0; i < words.length - 1; i++) {
        let word1 = words[i];
        let word2 = words[i + 1];
        let minLength = Math.min(word1.length, word2.length);

        // Edge case: "abc" -> "ab" (invalid order)
        if (word1.length > word2.length && word1.startsWith(word2)) {
            return null; // Cycle detected , early cycle detection
        }

        // use minLength
        for (let j = 0; j < minLength; j++) {
            if (word1[j] !== word2[j]) {
                if (!graph.get(word1[j]).has(word2[j])) { //not already added to the graph
                    graph.get(word1[j]).add(word2[j]);
                    inDegree.set(word2[j], inDegree.get(word2[j]) + 1);
                }
                break; // Only the first different character matters
            }
        }
    }

    return { graph, inDegree };
}

function topologicalSort(graph, inDegree) {
    let queue = [];
    let order = "";

    // Start with nodes having in-degree 0
    for (let [char, count] of inDegree) {
        if (count === 0) queue.push(char);
    }

    while (queue.length > 0) {
        let char = queue.shift();
        order += char; //update order here

        for (let neighbor of graph.get(char)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) queue.push(neighbor);
        }
    }

    // Check for cycle (if not all characters are processed)
    return order.length === graph.size ? order : "";
}

function alienOrder(words) {
    let result = buildGraph(words);
    if (!result) return ""; // Invalid order detected

    let { graph, inDegree } = result;
    return topologicalSort(graph, inDegree);
}

// Example usage
console.log(alienOrder(["wrt", "wrf", "er", "ett", "rftt"])); // Output: "wertf"
console.log(alienOrder(["z", "x"])); // Output: "zx"
console.log(alienOrder(["z", "x", "z"])); // Output: "" (Cycle detected)
