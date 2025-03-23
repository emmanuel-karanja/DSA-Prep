/**Preorder traversal is  root--->left-->right */

// Define the tree node structure
class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  // Function to build the binary tree from pre-order with null markers
  function buildTree(preorder) {
    // Use an index variable to track current position in the array
    let index = 0;
  
    function helper() {
      // Get current item
      const current = preorder[index];
  
      // Move to the next item
      index++;
  
      // If it's a null marker, return null
      if (current === '#') {
        return null;
      }
  
      // Create a new TreeNode
      const node = new TreeNode(current);
  
      // Recursively build the left and right subtrees
      node.left = helper();
      node.right = helper();
  
      return node;
    }
  
    return helper();
  }
  
  // Our sample preorder traversal array
const preorder = ['A', 'B', 'D', '#', '#', 'E', '#', '#', 'C', '#', 'F', '#', '#'];
const root = buildTree(preorder);

// In-order traversal to verify the structure
function printInOrder(node) {
  if (!node) return;
  printInOrder(node.left);
  console.log(node.value);
  printInOrder(node.right);
}

printInOrder(root);
