/**1. Start from the last non-leaf node (i.e., the last parent).
   2️. Heapify each node from bottom to top (post-order traversal).
   3. Continue till the root is heapified. 

  Min-Heap Rule for step 2: A root node is equal or less than the left and right children
  Max-Heap Rule for step 2: A root node is greater than or equal to the left and right children.

  Heap Rule: Given a root node at position  i left child is at 2i+1, right child is at 2i+2
             last parent node is at (n/2) - 1
  
  */


function heapifyMaxHeap(arr, n, i) {
    let largest = i; // Assume root is largest
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // Check if left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // Check if right child is larger than the current largest
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If the largest is not root, swap and heapify the affected subtree
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heapifyMinHeap(arr, n, i) {
    let smallest = i; // Assume root is smallest
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // Check if left child is smaller than root
    if (left < n && arr[left] < arr[smallest]) {
        smallest = left;
    }

    // Check if right child is smaller than the current smallest
    if (right < n && arr[right] < arr[smallest]) {
        smallest = right;
    }

    // If the largest is not root, swap and heapify the affected subtree
    if (smallest !== i) {
        [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
        heapifyMinHeap(arr, n, largest);
    }
}
           