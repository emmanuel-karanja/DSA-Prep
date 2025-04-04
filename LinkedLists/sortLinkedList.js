// Merge Sort for Linked List using MergeSort
function mergeSort(head) {
    if (!head || !head.next) {
      return head;
    }
  
    // Step 1: Split the list into two halves
    const middle = getMiddle(head);
    const rightHalfHead = middle.next;
    middle.next = null;
  
    // Step 2: Recursively sort both halves
    const leftSorted = mergeSort(head);
    const rightSorted = mergeSort(rightHalfHead);
  
    // Step 3: Merge the two sorted halves
    return merge(leftSorted, rightSorted);
  }
  
  // Function to find the middle of the linked list
  function getMiddle(head) {
    let slow = head;
    let fast = head;
  
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
  
    return slow;
  }
  
  // Function to merge two sorted linked lists
  function merge(left, right) {
    let dummy = new ListNode();
    let current = dummy;
  
    while (left && right) {
      if (left.value < right.value) {
        current.next = left;
        left = left.next;
      } else {
        current.next = right;
        right = right.next;
      }
      current = current.next;
    }
  
    // Attach the remaining nodes
    current.next = left || right;
  
    return dummy.next;
  }
  