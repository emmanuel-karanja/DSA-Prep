/**Create a dummy node. This just helps simplify logic.

Use a pointer (tail) that always points to the end of the merged list.

Walk through both lists:

Compare current nodes of both lists.

Append the smaller one to tail.next.

Move that list's pointer forward.

After loop: one list may have leftovers → just append it. */

function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0); // dummy starter node
    let tail = dummy;

    while (l1 !== null && l2 !== null) {
        if (l1.val < l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next; // move the tail forward
    }

    // At this point, at least one list is null
    tail.next = l1 || l2;

    return dummy.next; // skip dummy and return real head
}
