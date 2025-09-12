/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given two binary trees, write a function to check if they are the same.
 * 
 * Two binary trees are considered the same if they are structurally identical and the nodes have the same values.
 * 
 * Example:
 * ----------
 * Input: 
 *   Tree 1:    1         Tree 2:    1
 *             / \                   / \
 *            2   3                 2   3
 * Output: true
 * 
 * Input: 
 *   Tree 1:    1         Tree 2:    1
 *             /                       \
 *            2                         2
 * Output: false
 * 
 * Intuition:
 * ----------
 * 1. Use recursion to traverse both trees simultaneously.
 * 2. Base cases:
 *    - If both nodes are null, they are the same (return true).
 *    - If one is null and the other is not, trees differ (return false).
 * 3. Compare current node values and recursively check left and right subtrees.
 */

function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

function isSameTree(p, q) {
    if (!p && !q) return true;       // Both nodes null -> same
    if (!p || !q) return false;      // One null -> different
    // Check current node value and recurse on left and right
    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
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

// Driver code to test isSameTree
const testCases = [
    { p: [1,2,3], q: [1,2,3], expected: true },
    { p: [1,2], q: [1,null,2], expected: false },
    { p: [], q: [], expected: true },
];

testCases.forEach(({p, q, expected}, i) => {
    const treeP = arrayToTree(p);
    const treeQ = arrayToTree(q);
    const result = isSameTree(treeP, treeQ);
    console.log(`Test Case ${i + 1}: Expected = ${expected}, Got = ${result}`);
});
