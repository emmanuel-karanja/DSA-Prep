/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.
 * 
 * - k is a positive integer and is less than or equal to the length of the linked list.
 * - If the number of nodes is not a multiple of k then the remaining nodes at the end should remain as-is.
 * - You may not alter the values in the nodes—only nodes themselves may be changed.
 * 
 * Example:
 * ----------
 * Input: head = 1->2->3->4->5, k = 2
 * Output: 2->1->4->3->5
 * 
 * Input: head = 1->2->3->4->5, k = 3
 * Output: 3->2->1->4->5
 * 
 * Intuition:
 * ----------
 * 1. Use a helper function to reverse a segment of the list from `start` to `end` (exclusive).
 * 2. Count if there are at least k nodes; if not, return head as is.
 * 3. Reverse the first k nodes and recursively process the remaining list.
 * 4. Connect the reversed portion to the recursively reversed rest.
 */

function ListNode(val, next) {
    this.val = val;
    this.next = next || null;
}

function reverseKGroup(head, k) {
    // Helper function to reverse a segment from start to end (exclusive)
    const reverse = (start, end) => {
        let prev = end, curr = start;
        while (curr !== end) {
            const tmp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = tmp;
        }
        return prev; // New head of reversed segment
    };

    // Count nodes to ensure we have at least k nodes
    let node = head, count = 0;
    while (node) { count++; node = node.next; }
    if (count < k) return head; // Less than k nodes, return as-is

    // Reverse first k nodes
    let newHead = reverse(head, head);
    let temp = head;
    for (let i = 0; i < k; i++) temp = temp.next; // Move temp k steps forward

    // Recursively reverse the remaining list and connect
    head.next = reverseKGroup(temp, k);
    return newHead;
}

// Helper function to create a linked list from array
function arrayToList(arr) {
    const dummy = new ListNode(0);
    let curr = dummy;
    for (const val of arr) {
        curr.next = new ListNode(val);
        curr = curr.next;
    }
    return dummy.next;
}

// Helper function to convert linked list to array
function listToArray(head) {
    const arr = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }
    return arr;
}

// Driver code to test reverseKGroup
const testCases = [
    { list: [1,2,3,4,5], k: 2, expected: [2,1,4,3,5] },
    { list: [1,2,3,4,5], k: 3, expected: [3,2,1,4,5] },
    { list: [1,2,3,4,5,6], k: 3, expected: [3,2,1,6,5,4] } // For full groups only
];

testCases.forEach(({list, k, expected}, i) => {
    const result = reverseKGroup(arrayToList(list), k);
    console.log(`Test Case ${i + 1}: Expected = [${expected}], Got = [${listToArray(result)}]`);
});
