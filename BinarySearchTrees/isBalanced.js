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

function isBalanced(root) {
    function dfs(node) {
        if (!node) return 0;

        let leftHeight = dfs(node.left);
        let rightHeight = dfs(node.right);

        if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) return -1;
        return 1 + Math.max(leftHeight, rightHeight);
    }
    return dfs(root) !== -1;
}
