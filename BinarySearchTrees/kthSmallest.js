/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given a binary search tree (BST), find the kth smallest element in it.
 * 
 * Note: A BST's in-order traversal produces elements in **ascending order**.
 * 
 * Example:
 * ----------
 * Input: root = [3,1,4,null,2], k = 1
 * Output: 1
 * 
 * Input: root = [5,3,6,2,4,null,null,1], k = 3
 * Output: 3
 * 
 * Intuition:
 * ----------
 * 1. Perform an in-order traversal of the BST.
 * 2. Keep a counter to track how many nodes have been visited.
 * 3. When count reaches k, store the current node's value as the result.
 * 4. Stop traversal once the kth smallest element is found.
 */

function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

function kthSmallest(root, k) {
    let count = 0, result = null;

    // In-order traversal helper function
    const inorder = (node) => {
        if (!node || result !== null) return; // Stop if node is null or result found
        inorder(node.left);                  // Traverse left subtree
        count++;
        if (count === k) {                   // Check if current node is kth
            result = node.val;
            return;
        }
        inorder(node.right);                 // Traverse right subtree
    };

    inorder(root);
    return result;
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

// Driver code to test kthSmallest
const testCases = [
    { tree: [3,1,4,null,2], k: 1, expected: 1 },
    { tree: [5,3,6,2,4,null,null,1], k: 3, expected: 3 },
    { tree: [5,3,6,2,4,null,null,1], k: 6, expected: 6 },
];

testCases.forEach(({tree, k, expected}, i) => {
    const root = arrayToTree(tree);
    const result = kthSmallest(root, k);
    console.log(`Test Case ${i + 1}: Expected = ${expected}, Got = ${result}`);
});
