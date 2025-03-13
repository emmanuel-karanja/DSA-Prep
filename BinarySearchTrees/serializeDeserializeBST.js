function serialize(root) {
    if (!root) return "[]";  // Edge case

    let queue = [root], result = [];
    
    while (queue.length) {
        let node = queue.shift();
        
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
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
        i++;

        if (nodes[i] !== null) {
            node.right = new TreeNode(nodes[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}
