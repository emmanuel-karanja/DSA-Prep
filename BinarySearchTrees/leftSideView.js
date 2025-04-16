/**Gve the left side view of a BST, present them in order
 * 
 * LOGIC:
 * Do a BFS, the levelSize is the size of the queue containing the neighbours
 */
class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  } 

function leftView(root) {
    if (!root) return [];
  
    const result = [];
    const queue = [root];
  
    while (queue.length > 0) {
      let levelSize = queue.length;
  
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift(); //this is crucial
  
        // Add the first node of each level
        if (i === 0) {
          result.push(node.val);
        }
  
        // Enqueue left then right
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  
    return result;
  }

 
  
  // Create BST
  const root = new TreeNode(10);
  root.left = new TreeNode(5);
  root.right = new TreeNode(15);
  root.left.left = new TreeNode(2);
  root.left.right = new TreeNode(7);
  root.right.right = new TreeNode(20);
  
  console.log(leftView(root)); // Output: [10, 5, 2]
  