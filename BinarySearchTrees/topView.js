/**The top view of a Binary Search Tree (or any binary tree) consists of the nodes that
 *  are visible when the tree is viewed from the top — meaning the first node encountered at 
 * each horizontal distance (HD) from the root.
 * 
 * 
 * LOGIC:
 * Again do a BFS on a tree and keep track of the horizontal distance.
 * 
 * Imagine the root has a horizontal distance of 0 and all the other nodes at each level are displaced
 * outwards from it. 
 * 
 * left subtree nodes will have negative horizontal distances and right subtree nodes positive ones.
 * 
 * We keep track of hd=>NodeValue mappings in the topViewMap
 * 
 * We also keep track of the previous left and right displacements(minHd, and maxHd) respectively
 * and use that to compute horizontal distances for the next level we iterate to.

 */
class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

function topView(root) {
    if (!root) return [];
  
    const queue = [{ node: root, hd: 0 }];
    const topViewMap = new Map(); // hd => node.val
  
    let minHD = 0, maxHD = 0;
  
    while (queue.length > 0) {
      const { node, hd } = queue.shift();
  
      // Only store the first node at each horizontal distance, we check if the distance already exists
      // and if not, we add it and update the left and right distances.
      if (!topViewMap.has(hd)) {
        topViewMap.set(hd, node.val);
        minHD = Math.min(minHD, hd);  //we have to remind ourselves the previous level's horizontal distance was
        maxHD = Math.max(maxHD, hd);  //we keep track of that.
      }
  
      if (node.left) queue.push({ node: node.left, hd: hd - 1 }); 
      if (node.right) queue.push({ node: node.right, hd: hd + 1 });
    }
  
    console.log("view of to topViewMap",topViewMap)
    const result = [];
    
    for (let i = minHD; i <= maxHD; i++) {
      result.push(topViewMap.get(i));
    }
  
    return result;
  }

 
  
  const root = new TreeNode(10);
  root.left = new TreeNode(5);
  root.right = new TreeNode(15);
  root.left.left = new TreeNode(2);
  root.left.right = new TreeNode(7);
  root.right.left = new TreeNode(12);
  root.right.right = new TreeNode(20);
  
  console.log(topView(root)); // Output: [2, 5, 10, 15, 20]
  