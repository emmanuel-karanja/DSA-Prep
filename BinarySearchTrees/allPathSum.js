/**You are given the root of a binary tree containing digits from 0 to 9 only.

Each root-to-leaf path in the tree represents a number.

For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.

A leaf node is a node with no children. */

class TreeNode {
    constructor(val = 0, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  
  function sumNumbers(root) {
    let totalSum = 0;
  
    // Helper function to perform DFS traversal
    function dfs(node, currentNumber) {
      if (!node) return;
      
      // Update the current number formed by the path
      currentNumber = currentNumber * 10 + node.val;
      
      // If we reach a leaf node, add the current number to the total sum
      if (!node.left && !node.right) {
        totalSum += currentNumber; //this is crucial
        return;
      }
      
      // Recursively go to the left and right child nodes
      if (node.left) dfs(node.left, currentNumber);
      if (node.right) dfs(node.right, currentNumber);
    }
  
    // Start DFS from the root
    dfs(root, 0); 
  
    return totalSum;
  }

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

console.log(sumNumbers(root)); // Output: 522
