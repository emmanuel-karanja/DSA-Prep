/**Each list is already sorted, so at any given time, the smallest current node will be one of the
 *  first nodes of the k lists. That means we can:

Push the head of each list into a MinHeap.

Repeatedly pop the smallest node, add it to the result, and push its .next (if exists) into the heap.

Continue until the heap is empty.

O(Nlogk) for the minHeap version

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


//The other type Time is still O(nlogk), NOTE: This is not the naive one at a time merging

function mergeKLists(lists) {
    if (!lists || lists.length === 0) return null;

    while (lists.length > 1) {
        const mergedLists = [];

        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = (i + 1 < lists.length) ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(l1, l2));
        }

        lists = mergedLists;
    }

    return lists[0];
}

function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let tail = dummy;

    while (l1 && l2) {
        if (l1.val < l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }

    tail.next = l1 || l2;
    return dummy.next;
}
