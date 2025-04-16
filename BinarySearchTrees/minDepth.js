/**Find the minimum depth of a binary tree */
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function minDepth(root) {
    if (!root) return 0;

    let queue = [{ node: root, depth: 1 }];

    while (queue.length > 0) {
        let { node, depth } = queue.shift();

        // If it's a leaf node, return the depth
        if (!node.left && !node.right) return depth;

        if (node.left) queue.push({ node: node.left, depth: depth + 1 });
        if (node.right) queue.push({ node: node.right, depth: depth + 1 });
    }

    return 0;
}
