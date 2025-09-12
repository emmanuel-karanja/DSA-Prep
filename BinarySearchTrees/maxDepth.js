/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given a binary tree, find its maximum depth.
 * 
 * The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
 * 
 * Example:
 * ----------
 * Input:    3
 *          / \
 *         9  20
 *            / \
 *           15  7
 * Output: 3
 * 
 * Input: null
 * Output: 0
 * 
 * Intuition:
 * ----------
 * 1. Use recursion to traverse the tree.
 * 2. For each node, the depth is 1 + max(depth of left subtree, depth of right subtree).
 * 3. Base case: If the node is null, return 0.
 * 4. Recursively compute the depth for left and right subtrees.
 */

function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

function maxDepth(root) {
    if (!root) return 0; // Base case: empty tree has depth 0
    // Depth is 1 + maximum depth of left and right subtrees
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
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

// Driver code to test maxDepth
const testCases = [
    { tree: [3,9,20,null,null,15,7], expected: 3 },
    { tree: [], expected: 0 },
    { tree: [1,null,2], expected: 2 },
];

testCases.forEach(({tree, expected}, i) => {
    const root = arrayToTree(tree);
    const result = maxDepth(root);
    console.log(`Test Case ${i + 1}: Expected = ${expected}, Got = ${result}`);
});
