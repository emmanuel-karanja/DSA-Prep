class TreeNode{
    constructor(val,left=null,right=null){
        this.val=val;
        this.left=left;
        this.right=right;
    }
}

function cloneBinaryTree(root) {
    if (!root) return null;

    const newNode = new TreeNode(root.val);
    newNode.left = cloneBinaryTree(root.left);
    newNode.right = cloneBinaryTree(root.right);
    
    return newNode;
}
