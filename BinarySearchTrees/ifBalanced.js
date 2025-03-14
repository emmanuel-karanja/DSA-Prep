/** */

function isBalanced(root) {
    function dfs(node) {
        if (!node) return 0;
        let left = dfs(node.left);
        let right = dfs(node.right);
        if (left === -1 || right === -1 || Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    }
    return dfs(root) !== -1;
}
