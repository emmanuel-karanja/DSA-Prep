/**Logic
1. Initialize three pointers:

prev → Initially null (will track the previous node)
current → Initially pointing to the head
next → Will be used to store the next node temporarily

2. Iterate through the list:

   - Store the next node (next = current.next) to avoid losing reference.
   - Reverse the current node’s pointer (current.next = prev).
   - Move prev and current one step forward. i.e. prev=current and current=next
   - Update the head:

3.At the end of the loop, prev becomes the new head. */

class ListNode {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  function reverseLinkedList(head) {
    let prev = null;
    let current = head;
    let next = null;
  
    while (current !== null) {
      next = current.next; // Store next node
      current.next = prev; // Reverse pointer
      
      prev = current;      // Move prev forward
      current = next;      // Move current forward
    }
  
    return prev; // New head of reversed list
  }
  
  // Driver Code
  function printList(head) {
    let temp = head;
    let result = [];
    while (temp !== null) {
      result.push(temp.value);
      temp = temp.next;
    }
    console.log(result.join(" -> "));
  }
  
  // Example usage
  let head = new ListNode(1);
  head.next = new ListNode(2);
  head.next.next = new ListNode(3);
  head.next.next.next = new ListNode(4);
  
  console.log("Original List:");
  printList(head);
  
  let reversedHead = reverseLinkedList(head);
  
  console.log("Reversed List:");
  printList(reversedHead);
  