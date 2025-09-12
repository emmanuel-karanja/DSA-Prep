/*#*/
/**
 * Problem Statement:
 * -----------------
 * You are given two non-empty linked lists representing two non-negative integers. 
 * The digits are stored in reverse order, and each node contains a single digit.
 * Add the two numbers and return the sum as a linked list, also in reverse order.
 * 
 * Example:
 * ----------
 * Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 * Output: 7 -> 0 -> 8
 * Explanation: 342 + 465 = 807
 * 
 * Input: (0) + (0)
 * Output: 0
 * 
 * Input: (9 -> 9 -> 9 -> 9 -> 9 -> 9 -> 9) + (9 -> 9 -> 9 -> 9)
 * Output: 8 -> 9 -> 9 -> 9 -> 0 -> 0 -> 0 -> 1
 * 
 * Intuition:
 * ----------
 * 1. Use a dummy head node to simplify handling the head of the result list.
 * 2. Traverse both linked lists simultaneously, adding corresponding digits along with carry.
 * 3. If one list is shorter, treat missing nodes as 0.
 * 4. Maintain carry for sums >= 10.
 * 5. After processing both lists, if carry > 0, add a final node for it.
 */

function ListNode(val, next) { 
    this.val = val; 
    this.next = next || null; 
}

function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0); // Dummy head for result linked list
    let p = l1, q = l2, curr = dummy; // Pointers for traversing lists
    let carry = 0; // Carry for sum >= 10

    while (p || q || carry) {
        const sum = (p ? p.val : 0) + (q ? q.val : 0) + carry; // Add digits + carry
        carry = Math.floor(sum / 10); // Update carry
        curr.next = new ListNode(sum % 10); // Create new node for current digit
        curr = curr.next; // Move current pointer
        if (p) p = p.next; // Move pointer in l1
        if (q) q = q.next; // Move pointer in l2
    }

    return dummy.next; // Return the head of the result list
}

// Helper function to create a linked list from an array
function arrayToList(arr) {
    const dummy = new ListNode(0);
    let curr = dummy;
    for (const val of arr) {
        curr.next = new ListNode(val);
        curr = curr.next;
    }
    return dummy.next;
}

// Helper function to print linked list as array
function listToArray(head) {
    const arr = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }
    return arr;
}

// Driver code to test addTwoNumbers
const testCases = [
    { l1: [2,4,3], l2: [5,6,4], expected: [7,0,8] },
    { l1: [0], l2: [0], expected: [0] },
    { l1: [9,9,9,9,9,9,9], l2: [9,9,9,9], expected: [8,9,9,9,0,0,0,1] }
];

testCases.forEach(({l1, l2, expected}, i) => {
    const result = addTwoNumbers(arrayToList(l1), arrayToList(l2));
    console.log(`Test Case ${i + 1}: Expected = [${expected}], Got = [${listToArray(result)}]`);
});
