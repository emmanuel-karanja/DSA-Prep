/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given a binary tree, a node X in the tree is named "good" if in the path from the root to X
 * there are no nodes with a value greater than X.
 * 
 * Return the number of good nodes in the binary tree.
 * 
 * Example:
 * ----------
 * Input: root = [3,1,4,3,null,1,5]
 * Output: 4
 * Explanation: Nodes 3 (root), 3 (left child of 1), 4, and 5 are good nodes.
 * 
 * Input: root = [3,3,null,4,2]
 * Output: 3
 * 
 * Input: root = [1]
 * Output: 1
 * 
 * Intuition:
 * ----------
 * 1. Perform DFS (Depth-First Search) traversal of the tree.
 * 2. Keep track of the maximum value encountered along the path from root to current node.
 * 3. If current node's value >= max value so far, increment count (good node).
 * 4. Update max value for the path and recurse into left and right subtrees.
 */

function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

function goodNodes(root) {
    let count = 0; // To track the number of good nodes

    // DFS helper function
    const dfs = (node, maxVal) => {
        if (!node) return; // Base case: empty node
        // Check if current node is good
        if (node.val >= maxVal) count++;
        const newMax = Math.max(maxVal, node.val); // Update max value for path
        dfs(node.left, newMax);  // Recurse left
        dfs(node.right, newMax); // Recurse right
    };

    dfs(root, root.val); // Start DFS from root
    return count;
}

// Helper function to create tree from array (level-order) for testing
function arrayToTree(arr) {
    if (!arr.length) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (i < arr.length) {
        const node = queue.shift();
        if (arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

// Driver code to test goodNodes
const testCases = [
    { tree: [3,1,4,3,null,1,5], expected: 4 },
    { tree: [3,3,null,4,2], expected: 3 },
    { tree: [1], expected: 1 },
];

testCases.forEach(({tree, expected}, i) => {
    const root = arrayToTree(tree);
    const result = goodNodes(root);
    console.log(`Test Case ${i + 1}: Expected = ${expected}, Got = ${result}`);
});
