/**Serialize and deserialize a binary tree.
 * 
 */

class TreeNode{
    constructor(val=0,left=null,right=null){
        this.val=val;
        this.left=left;
        this.right=right;
    }
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

function serialize(root) {
    if (!root) return "[]";  // Edge case

    let queue = [root], result = [];
    
    while (queue.length) {
        let node = queue.shift();
        
        if (node) {

            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else { //null cases
            result.push(null);
        }
    }
    return JSON.stringify(result);
}



function deserialize(data) {
    let nodes = JSON.parse(data);
    if (!nodes.length) return null;
    
    let root = new TreeNode(nodes[0]);
    let queue = [root];
    let i = 1;

    while (queue.length) {
        let node = queue.shift();
        
        if (nodes[i] !== null) {
            node.left = new TreeNode(nodes[i]);
            queue.push(node.left);
        }
        i++; //alwways increment

        if (nodes[i] !== null) {
            node.right = new TreeNode(nodes[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

const arr=[4, 2, 5, 1, 6, 3, 7]

const root=buildBalancedBST(arr);

console.log(root)

const serial=serialize(root)

console.log(serial)

const deserial=deserialize(serial)

console.log(deserial)