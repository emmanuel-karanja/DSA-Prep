/**The problem of flattening a binary tree into a linked list means transforming a binary tree into a
 *  linked list where the left pointers are null and the right pointers form a chain.

The flattened binary tree will have its nodes arranged in a pre-order traversal.

LOGIC:

1. Pre-order traverse it into an array.
2. Construct a linked list from the array. 

You can optimize it by constructing the linked list on the fly without having to create an array first
for memory optimization.
*/

// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

 function flatten (root) {
    if (!root) return;

    // Step 1: Perform a pre-order traversal and collect the nodes in an array
    let nodes = [];
    function preorderTraversal (node) {
        if (!node) return;
        nodes.push(node);  // Add the node to the array
        preorderTraversal(node.left);  // Visit left subtree
        preorderTraversal(node.right);  // Visit right subtree
    };
    
    preorderTraversal(root);  // Perform the pre-order traversal

    // Step 2: Convert the nodes array into a linked list
    for (let i = 1; i < nodes.length; i++) {
        let currentNode = nodes[i - 1];
        currentNode.left = null;  // Set the left pointer to null
        currentNode.right = nodes[i];  // Set the right pointer to the next node
    }

    // Set the left pointer of the last node to null (not strictly necessary)
    if (nodes.length > 0) {
        nodes[nodes.length - 1].left = null;
        nodes[nodes.length - 1].right = null;
    }
}


// Utility function to print the flattened tree as a linked list
function printLinkedList(node) {
    let result = [];
    while (node) {
        result.push(node.val);
        node = node.right; // Traverse the "right" pointers of the flattened tree
    }
    console.log(result.join(" → "));
}

// Driver Code: Create a sample binary tree
var root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(5);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(4);
root.right.right = new TreeNode(6);

// Print the original tree structure (pre-order)
console.log("Original tree (pre-order): 1, 2, 3, 4, 5, 6");

// Flatten the tree into a linked list
flatten(root);

// Print the flattened tree (linked list)
console.log("Flattened linked list:");
printLinkedList(root);
