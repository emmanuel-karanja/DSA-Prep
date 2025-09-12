/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given a binary tree, determine if it is a valid Binary Search Tree (BST).
 * 
 * A BST must satisfy:
 * 1. The left subtree of a node contains only nodes with keys **less than** the node's key.
 * 2. The right subtree of a node contains only nodes with keys **greater than** the node's key.
 * 3. Both left and right subtrees must also be BSTs.
 * 
 * Example:
 * ----------
 * Input: root = [2,1,3]
 * Output: true
 * 
 * Input: root = [5,1,4,null,null,3,6]
 * Output: false
 * 
 * Intuition:
 * ----------
 * 1. Use recursion with a range for each node.
 * 2. Each node must satisfy: min < node.val < max.
 * 3. For left child, update max to current node's value.
 * 4. For right child, update min to current node's value.
 * 5. If any node violates this, the tree is not a BST.
 */

function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

function isValidBST(root) {
    const helper = (node, min, max) => {
        if (!node) return true; // Base case: empty node is valid
        if (node.val <= min || node.val >= max) return false; // BST property violation
        // Check left subtree with updated max, right subtree with updated min
        return helper(node.left, min, node.val) && helper(node.right, node.val, max);
    };
    return helper(root, -Infinity, Infinity);
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

// Driver code to test isValidBST
const testCases = [
    { tree: [2,1,3], expected: true },
    { tree: [5,1,4,null,null,3,6], expected: false },
    { tree: [10,5,15,null,null,6,20], expected: false },
];

testCases.forEach(({tree, expected}, i) => {
    const root = arrayToTree(tree);
    const result = isValidBST(root);
    console.log(`Test Case ${i + 1}: Expected = ${expected}, Got = ${result}`);
});
