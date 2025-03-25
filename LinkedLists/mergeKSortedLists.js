/**Each list is already sorted, so at any given time, the smallest current node will be one of the
 *  first nodes of the k lists. That means we can:

Push the head of each list into a MinHeap.

Repeatedly pop the smallest node, add it to the result, and push its .next (if exists) into the heap.

Continue until the heap is empty.

 */

class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

function mergeKSortedLists(lists) {
    const heap = new MinHeap((a, b) => a.val - b.val);

    // Push the head of each list into the heap
    for (let node of lists) {
        if (node) {
            heap.insert(node);
        }
    }

    const dummy = new ListNode(0);
    let current = dummy;

    while (heap.size() > 0) {
        const smallest = heap.extractMin(); // Node with smallest val
        current.next = smallest;
        current = current.next;

        if (smallest.next) {
            heap.insert(smallest.next);
        }
    }

    return dummy.next;
}
