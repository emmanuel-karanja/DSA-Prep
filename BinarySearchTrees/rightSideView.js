/**The right side view of a binary tree is the set of nodes that are visible when the tree is viewed from the right side. 
 * The nodes are seen level by level, starting from the top and moving down. 
 * 
 * LOGIC:
 * To get the right side view of a binary tree, we can perform a level order traversal (breadth-first search) 
 * while ensuring that we only capture the rightmost node at each level.


  1.Perform a level-order traversal (using a queue).
  2. For each level, pick the rightmost node.
  3. Append the rightmost node to the result.
 * 
  FOR LEFT SIDE VIEW: We only need to take the node at levelIndex===0
 * */

// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

// Function to get the right side view of the binary tree
function rightSideView(root) {
    if (!root) return [];
    
    let result = [];
    let queue = [root];  // Start with the root node in the queue
    
    while (queue.length > 0) {
        let levelSize = queue.length; //we are guarateed that the level will be the same as queue length
        
        // Iterate over the nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            
            // If we're at the rightmost node of the level, add it to the result
            if (i === levelSize - 1) {
                result.push(node.val); //we only add the right most one
            }
            
            // Add the children to the queue for the next level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
}

// Driver Code: Create a sample binary tree
var root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(4);

// Print the right side view
console.log("Right side view:", rightSideView(root));  // Expected output: [1, 3, 4]
