/*Do an inorder traversal left,root,right and push the elements into an array, and then starting at the 
middle of the sorted array(BST always give a sorted array), rebuild the tree */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Step 1: Convert BST to Sorted Array using Inorder Traversal
function inorderTraversal(root, result = []) {
    if (!root) return;
    inorderTraversal(root.left, result);
    result.push(root.val);
    inorderTraversal(root.right, result);
    return result;
}

// Step 2: Build Balanced BST from Sorted Array
function buildBalancedBST(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    
    let mid = Math.floor((start + end) / 2);
    let node = new TreeNode(arr[mid]);

    node.left = buildBalancedBST(arr, start, mid - 1);
    node.right = buildBalancedBST(arr, mid + 1, end);

    return node;
}

// Main Function to Balance a BST
function balanceBST(root) {
    let sortedArray = inorderTraversal(root);
    return buildBalancedBST(sortedArray);
}
