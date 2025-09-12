/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given two non-empty binary trees `s` and `t`, check whether `t` is a subtree of `s`.
 * 
 * A subtree of `s` is a tree that consists of a node in `s` and all of its descendants.
 * `s` could also be considered a subtree of itself.
 * 
 * Example:
 * ----------
 * Input: 
 * s = [3,4,5,1,2], t = [4,1,2]
 * Output: true
 * 
 * Input:
 * s = [3,4,5,1,2,null,null,null,null,0], t = [4,1,2]
 * Output: false
 * 
 * Intuition:
 * ----------
 * 1. Traverse tree `s` and at each node check if the subtree rooted at that node is identical to `t`.
 * 2. Use the previously defined `isSameTree` function to compare trees.
 * 3. Recursively check the left and right subtrees if current node is not a match.
 */

function TreeNode(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
}

// Reuse isSameTree function from previous problem
function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

function isSubtree(s, t) {
    if (!s) return false; // Reached end of tree `s` without match
    // Check if current subtree matches or recurse into left/right subtrees
    return isSameTree(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
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

// Driver code to test isSubtree
const testCases = [
    { s: [3,4,5,1,2], t: [4,1,2], expected: true },
    { s: [3,4,5,1,2,null,null,null,null,0], t: [4,1,2], expected: false },
    { s: [1], t: [1], expected: true }
];

testCases.forEach(({s, t, expected}, i) => {
    const treeS = arrayToTree(s);
    const treeT = arrayToTree(t);
    const result = isSubtree(treeS, treeT);
    console.log(`Test Case ${i + 1}: Expected = ${expected}, Got = ${result}`);
});
