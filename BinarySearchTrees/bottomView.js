/**The bottom view is the set of nodes visible when you look at the tree from the bottom.

Think of standing directly beneath the tree — for each vertical column,
 you want to see the bottom-most node in that column. */

 class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

 function bottomView(root) {
    if (!root) return [];
  
    const hdMap = new Map();
    const queue = [{ node: root, hd: 0 }];
  
    while (queue.length > 0) {
      const { node, hd } = queue.shift();
  
      // Overwrite value for each hd to get bottom-most
      hdMap.set(hd, node.val);
  
      if (node.left) queue.push({ node: node.left, hd: hd - 1 });
      if (node.right) queue.push({ node: node.right, hd: hd + 1 });
    }
  
    // Sort keys and build result
    const sortedKeys = [...hdMap.keys()].sort((a, b) => a - b); 
    return sortedKeys.map(hd => hdMap.get(hd));
  }
  
  const root = new TreeNode(10);
  root.left = new TreeNode(5);
  root.right = new TreeNode(15);
  root.left.left = new TreeNode(2);
  root.left.right = new TreeNode(7);
  root.right.left = new TreeNode(12);
  root.right.right = new TreeNode(20);
  
  console.log(bottomView(root));