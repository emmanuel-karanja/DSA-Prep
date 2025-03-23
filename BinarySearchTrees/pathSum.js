/**ven a binary tree, find the maximum path sum.

A path is any sequence of nodes from some starting node to any node in the tree along parent-child
 connections (not necessarily going through the root).
The path must contain at least one node, and you can’t revisit a node.

You want to find the path with the maximum sum, where the path can:

Start and end anywhere
Go up then down through a node
That means you have to consider all possible "V"-shaped paths:
a node, plus its left and right subtrees.

Because when we're passing info up to the parent, we're saying:

“Here’s the best single path that includes me and one of my subtrees, and you (the parent) 
can add it to yourself.”

If we returned both sides, the path would branch, which breaks the definition of a valid path in this context.

*/

function maxPathSum(root) {
    let maxSum = -Infinity;

    function dfs(node) {
        if (!node) return 0;

        // Recursively compute max gain from left and right, we compare to 0 because it could be negative
        let leftGain = Math.max(dfs(node.left), 0);
        let rightGain = Math.max(dfs(node.right), 0);

        // Max path sum WITH split at current node. This is a V-shaped path — includes both subtrees
        // i.e. left-->current-->right, we don't return this to the parent because it splits and we get two paths
        //that's not what we want. We want to keep this incase it turns out to be the pathsum
        let priceNewPath = node.val + leftGain + rightGain;

        // Update global max if it's better, 
        maxSum = Math.max(maxSum, priceNewPath);

        // Return max gain to parent (only one side allowed), 
        return node.val + Math.max(leftGain, rightGain);
    }

    dfs(root);
    return maxSum;
}


/**Modified to get the path itself */

function maxPathSumWithPath(root) {
    let maxSum = -Infinity;
    let bestPath = [];

    function dfs(node) {
        //notice we take care to add the empty array to keep the path
        if (!node) return { gain: 0, path: [] };

        // Get max gain and path from left & right children
        const left = dfs(node.left);
        const right = dfs(node.right);

        // Ignore negative gains
        const leftGain = Math.max(left.gain, 0);
        const rightGain = Math.max(right.gain, 0);

        // Build the current path through this node (may split)
        const currentPath = [...(left.gain > 0 ? left.path : []), node.val, ...(right.gain > 0 ? right.path : [])];
        const currentSum = node.val + leftGain + rightGain;

        // Update global max and best path if needed
        if (currentSum > maxSum) {
            maxSum = currentSum;
            bestPath = currentPath;
        }

        // Return max gain + path (only one side allowed when going up)
        if (leftGain > rightGain) {
            return { gain: node.val + leftGain, path: [...left.path, node.val] };
        } else {
            return { gain: node.val + rightGain, path: [...right.path, node.val] };
        }
    }

    dfs(root);
    return { maxSum, bestPath };
}
