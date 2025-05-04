/**Create a dummy node. This just helps simplify logic.

Use a pointer (tail) that always points to the end of the merged list.

Walk through both lists:

Compare current nodes of both lists.

Append the smaller one to tail.next.

Move that list's pointer forward.

After loop: one list may have leftovers → just append it. */

class ListNode {
    constructor(value = 0, next = null) {
      this.value = value;
      this.next = next;
    }
  }
  
  function merge(list1, list2) {
    // Step 1: Create a dummy node to simplify the merge process
    let dummy = new ListNode();
    let current = dummy;  // This will keep track of the last node in the merged list
  
    // Step 2: Traverse both lists
    while (list1 !== null && list2 !== null) {
      if (list1.value <= list2.value) {
        // Step 3: Attach the smaller node to the merged list
        current.next = list1;
        list1 = list1.next;  // Move to the next node in list1
      } else {
        current.next = list2;
        list2 = list2.next;  // Move to the next node in list2
      }
  
      current = current.next;  // Move the current pointer
    }
  
    // Step 4: Attach the remaining nodes from the non-empty list
    if (list1 !== null) {
      current.next = list1;
    } else if (list2 !== null) {
      current.next = list2;
    }
  
    // Step 5: Return the merged list, starting from the first node
    return dummy.next;
  }
  
  // Helper function to create a linked list from an array
  function arrayToList(arr) {
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }
    return head;
  }
  
  // Helper function to print the linked list
  function printList(head) {
    let current = head;
    while (current) {
      process.stdout.write(current.value + " -> ");
      current = current.next;
    }
    console.log("null");
  }
  
  // Example usage:
  const list1 = arrayToList([1, 3, 5]);
  const list2 = arrayToList([2, 4, 6]);
  
  console.log("List 1:");
  printList(list1);
  
  console.log("List 2:");
  printList(list2);
  
  const mergedList = merge(list1, list2);
  console.log("Merged List:");
  printList(mergedList);
  
