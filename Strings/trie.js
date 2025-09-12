/*#*/


/**
 * Problem 18: Trie Prefix
 * Problem Statement:
 * Implement Trie with insert, search, and startsWith.
 * Intuition:
 * Use tree structure where each node represents a character.
 * Logic:
 * 1. Insert: traverse/create nodes for each character.
 * 2. Search: traverse nodes and check endOfWord.
 * 3. startsWith: traverse nodes, return true if path exists.
 */
class TrieNode {
    constructor() {
        this.children = {};
        this.endOfWord = false;
    }
}

class Trie {
    constructor() { this.root = new TrieNode(); }
    insert(word) {
        let node = this.root;
        for (const c of word) {
            if (!node.children[c]) node.children[c] = new TrieNode();
            node = node.children[c];
        }
        node.endOfWord = true;
    }
    search(word) {
        let node = this.root;
        for (const c of word) {
            if (!node.children[c]) return false;
            node = node.children[c];
        }
        return node.endOfWord;
    }
    startsWith(prefix) {
        let node = this.root;
        for (const c of prefix) {
            if (!node.children[c]) return false;
            node = node.children[c];
        }
        return true;
    }
}