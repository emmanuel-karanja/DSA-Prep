/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given a 2D board of letters and a list of words, find all words from the list that exist in the board.
 * 
 * - Words can be constructed from letters of sequentially adjacent cells (horizontally or vertically).
 * - The same letter cell may not be used more than once in a word.
 * 
 * Example:
 * ----------
 * Input: 
 * board = [
 *   ['o','a','a','n'],
 *   ['e','t','a','e'],
 *   ['i','h','k','r'],
 *   ['i','f','l','v']
 * ], words = ["oath","pea","eat","rain"]
 * Output: ["oath","eat"]
 * 
 * Intuition:
 * ----------
 * 1. Build a Trie from the given word list for fast prefix matching.
 * 2. Perform DFS from each cell in the board.
 * 3. At each step, check if the current path is a valid prefix in the Trie.
 * 4. If a word is complete in the Trie, add it to the result set.
 * 5. Use backtracking to mark visited cells temporarily.
 */

// Trie Node
class TrieNode {
    constructor() {
        this.children = {};  // Map of character -> TrieNode
        this.endOfWord = false;
    }
}

// Trie
class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) node.children[char] = new TrieNode();
            node = node.children[char];
        }
        node.endOfWord = true;
    }
}

// Main function to find words
function findWords(board, words) {
    const res = new Set();
    const trie = new Trie();

    // Insert all words into Trie
    for (const w of words) trie.insert(w);

    const m = board.length, n = board[0].length;

    const dfs = (i, j, node, path) => {
        if (!node) return;

        if (node.endOfWord) res.add(path);

        const c = board[i][j];
        board[i][j] = '#'; // mark as visited

        for (const [dx, dy] of [[1,0],[0,1],[-1,0],[0,-1]]) {
            const x = i + dx, y = j + dy;
            if (x >= 0 && y >= 0 && x < m && y < n && node.children[board[x][y]]) {
                dfs(x, y, node.children[board[x][y]], path + board[x][y]);
            }
        }

        board[i][j] = c; // backtrack
    };

    // Start DFS from each cell
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (trie.root.children[board[i][j]]) {
                dfs(i, j, trie.root.children[board[i][j]], board[i][j]);
            }
        }
    }

    return Array.from(res); // Convert set to array
}

// Driver code to test findWords
const board = [
    ['o','a','a','n'],
    ['e','t','a','e'],
    ['i','h','k','r'],
    ['i','f','l','v']
];
const words = ["oath","pea","eat","rain"];
const result = findWords(board, words);
console.log("Words found:", result); // Expected: ["oath","eat"]
