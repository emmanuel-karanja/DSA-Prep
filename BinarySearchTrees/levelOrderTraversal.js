/**Level Order Traversal is a way of visiting all nodes of a tree level by level, from left to right.
 * 
 * LOGIC:
 * Logic Applied
1. Use a Queue (FIFO structure) to process nodes level by level.
2. Start with the root node in the queue.
3. While the queue is not empty:
       -Dequeue a node.
       -Process it.
       -Enqueue its left and right children if they exist.
    Repeat until all nodes are visited.
 
    It's basically a BFS traversal of a tree.

    Time O(N) every node is visited.
    Space O(N) for the storage of the nodes in the results array
 */

    class TreeNode {
        constructor(value) {
            this.val = value;
            this.left = null;
            this.right = null;
        }
    }
    
    function levelOrderTraversal(root) {
        if (!root) return [];
    
        let queue = [root];
        let result = [];
    
        while (queue.length > 0) {
            let node = queue.shift();  // Dequeue
            result.push(node.val);
    
            if (node.left) queue.push(node.left);   // Enqueue left child
            if (node.right) queue.push(node.right); // Enqueue right child
        }
    
        return result;
    }
    
    // Example Usage
    let root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    
    console.log(levelOrderTraversal(root));  
    // Output: [1, 2, 3, 4, 5, 6]
    