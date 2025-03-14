
/**The Lowest Common Ancestor (LCA) of two nodes p and q in a binary tree is the lowest (deepest) node 
 * that has both p and q as descendants (where a node can be its own descendant).
 * 
 * LOGIC:
 * 
 * 1.Start at the root.
   2.If both nodes p and q are smaller than root, the LCA must be in the left subtree.
   3. If both nodes p and q are greater, the LCA must be in the right subtree.
   4. If one node is on the left and the other is on the right (or one node is the root), 
   the current node is the LCA.
   
   if p<root and q>root, it follows that the root is the LCA. And once we pick a subtree, we'll
   that as if it's a whole tree. 

   If p and q are the same node i.e. they have the same value, either one is the LCA since a node
   is its own ancestor.

   O(log n) balanced tree or O(n) for general/skewed tree.
   
   */

function lowestCommonAncestorBST(root, p, q) {
    while (root) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left; // Move left
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right; // Move right
        } else {
            return root; // Found LCA
        }
    }
    return null;
}

