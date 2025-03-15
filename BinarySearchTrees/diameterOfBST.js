/**The diameter (or width) of a tree is the length of the longest path between any two nodes in the tree.
 *  The length is measured in terms of the number of edges (not nodes) on this path. 
 * 
 * It DOES NOT necessarily pass through the root. It's either:
 * 
 * 1. Entirely within a sub-tree
 * 2. Passes through the root
 * 
 * LOGIC
 * 
 * 1. Implement an algorithm to find the height of a tree.
 * 2. Find the diameter of left subtree
 * 3. Find the diameter of the right subtree
 * 4. Find the height of left subtree and then right subtree
 * 
 * 5. Diameter=Math.max(leftHeight+rightHeight+2, Math.max(leftDiameter,rightDiameter))
 * 6. The 2 is added to account for the edge connect left subtree to the root and for the other edge
 *    connecting the right right subtree to the root.
 * 
 * */

class TreeNode {
    constructor(val, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  
  function treeDiameter(root) {
    let maxDiameter = 0;
  
    function height(node) {
      if (!node) return -1; // Base case: height of null node is -1
  
      let leftHeight = height(node.left);
      let rightHeight = height(node.right);
  
      // Diameter passing through this node
      let localDiameter = leftHeight + rightHeight + 2; //we account for the two edges from left and right 
      //subtrees touching the tree root.
  
      // Update global maximum diameter
      maxDiameter = Math.max(maxDiameter, localDiameter);
  
      // Return height of this node
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    height(root); // Initiate DFS traversal
    return maxDiameter;
  }
  
  // Example Usage:
  const root = new TreeNode(1, 
    new TreeNode(2, new TreeNode(4), new TreeNode(5)), 
    new TreeNode(3)
  );
  console.log(treeDiameter(root)); // Output: 3
  