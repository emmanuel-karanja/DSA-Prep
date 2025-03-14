/**Height of a BST is the longest path in edges from root to leaf. 
 * LOGIC:
 * 
 * 1. Check if the root node is null if it's return -1 that tree has no edges.
 * 2. Find the height of the left subtree
 * 3. Find the height of the right subtree.
 * 4. Find the Math.max(leftHeight,rightHeight)
 * 5. Add 1.  Why? Because we've to account for the 1 edge connecting the subtree to the root node.
 * 
 * LEVELS of a BST = height+1. Why? Because height counts edges and Levels is about the number of nodes.
 * so, you add 1. It's like the fence posts in a line problem.
 */

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function findHeight(root) {
    if (root === null) {
        return -1; // Height of an empty tree is -1
    }
    return Math.max(findHeight(root.left), findHeight(root.right)) + 1;
}

// Example Usage:
const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);
root.right.right = new TreeNode(20);

console.log(findHeight(root)); // Output: 2


class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function findHeightBFS(root) {
    if (root === null) {
        return -1; // Height of an empty tree is -1
    }

    let queue = [root];
    let height = -1;

    while (queue.length > 0) {
        let levelSize = queue.length; // Number of nodes at the current level

        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift(); // Dequeue

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        height++; // Increment height at the end of each level
    }

    return height;
}

// Example Usage:
const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);
root.right.right = new TreeNode(20);

console.log(findHeightBFS(root)); // Output: 2
