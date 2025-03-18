/**Find the kth node from the end of a linked list.
 * 
 *  LOGIC:
 * 
 * 1. Two pointers, first and second.
 * 2. Move the first pointer k steps into the linked list.
 * 3. Move both first and second one step each until first==null.
 * 4. Second pointer will be at the kth place from the end of the linked list.
 * 
 */

class ListNode {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  function findKthFromEnd(head, k) {
    let first = head;
    let second = head;
  
    // Move the first pointer k steps ahead
    for (let i = 0; i < k; i++) {
      if (first === null) return null; // If k is greater than the list length
      first = first.next;
    }
  
    // Move both pointers until first reaches the end
    while (first !== null) {
      first = first.next;
      second = second.next;
    }
  
    return second; // The second pointer is now at the k-th node from the end
  }
  
  // Helper function to create a linked list
  function createLinkedList(arr) {
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }
    return head;
  }
  
  // Helper function to print linked list
  function printLinkedList(head) {
    let result = [];
    while (head !== null) {
      result.push(head.value);
      head = head.next;
    }
    console.log(result.join(" -> "));
  }
  
    