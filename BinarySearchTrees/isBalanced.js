/**A binary tree is considered balanced if, for every node in the tree, 
 * the difference in height between the left and right subtrees is at most 1.
 * 
 * LOGIC:
 * 
 * 1. Find the height of the left subtree.
 * 2. Find the height of the right subtree.
 * 3. Evaluate that condition.
 * 
 * 
 * Time O(n) 
 * 
 * 
*/

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function isBalanced(root) {
    function checkHeight(node) {
        if (!node) return 0; // Base case: height of null is 0

        let leftHeight = checkHeight(node.left);
        if (leftHeight === -1) return -1; // Left subtree is unbalanced

        let rightHeight = checkHeight(node.right);
        if (rightHeight === -1) return -1; // Right subtree is unbalanced

        if (Math.abs(leftHeight - rightHeight) > 1) return -1; // Current node is unbalanced

        return Math.max(leftHeight, rightHeight) + 1; // Return height of current node
    }

    return checkHeight(root) !== -1;
}
