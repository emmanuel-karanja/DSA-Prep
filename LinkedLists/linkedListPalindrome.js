/**Find if a given linked list is a palindrome
 * 
 * LOGIC:
 * Since singly linked lists don’t allow traversal backwards, you need a smart approach. Here's a common optimal solution:

Steps (O(n) time | O(1) space):
1. Find the middle of the linked list using slow and fast pointers.
2. Reverse the second half of the list.
3. Compare the first half and the reversed second half node by node.

(Optional) Restore the original list by reversing the second half again.

 */
function isPalindrome(head) {
    if (!head || !head.next) return true;

    // Step 1: Find the middle
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Step 2: Reverse second half
    let prev = null;
    while (slow) {
        let next = slow.next;
        slow.next = prev;
        
        prev = slow;
        slow = next;
    }

    // Step 3: Compare both halves
    let left = head, right = prev;
    while (right) {
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }

    return true;
}
