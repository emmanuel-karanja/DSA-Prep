/** Inverting a BST means sapping left and right children, 
 * basically MIRRORING the binary tree on its central axis
 * LOGIC
 * If the current root null, return null else
 * 1. Invert left sub-tree
 * 2. Invert right sub-tree.
 * 3. ReAssigned root.left and root.right
 * 
 *
 * 
 * USES: Flipping Images
 *  */

/**BFS approach is iterative and hence will not suffer from stackoverflow error but consumes more memory */

function invertTree(root) {
    //early exit without it, you are stuck.
    if (!root) return null;
  
    let queue = [root];
  
    while (queue.length) {
      let node = queue.shift(); // Dequeue
  
      // Swap left and right children
      [node.left, node.right] = [node.right, node.left];
  
      //pursue the children, start with left and go to right
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  
    return root;
  }
  

  function invertTree(root) {
    // If the tree is empty, return null
    if (!root) return null;
  
    // Recursively invert the left and right subtrees
    let leftInverted = invertTree(root.right);
    let rightInverted = invertTree(root.left);
  
    // Swap the left and right children
    root.left = leftInverted;
    root.right = rightInverted;
  
    // Return the modified tree
    return root;
  }
  