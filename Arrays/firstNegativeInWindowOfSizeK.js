/**Given an array arr[] and a positive integer k, for each window of size k, 
 * find the first negative number in that window. If there's no negative number in the window, output 0.

 Intuition:
 We slide a window of size k across the array, and:
  1. Maintain a queue of indices of negative numbers.
  2. As the window moves, remove indices that fall out of the window.
  3. The first index in the queue is the first negative number in the current window.
  

  *Looking at this implementation, I can see it could be a precursor to mastery of the Sliding Window Maximum
  
  */

function firstNegativeInWindow(arr, k) {
    const result = [];
    const queue = []; // Stores indices of negative numbers

    for (let i = 0; i < arr.length; i++) {
        // Add negative numbers to the queue
        if (arr[i] < 0) {
            queue.push(i);
        }

        // Remove out-of-window indices
        if (queue.length && queue[0] <= i - k) {
            queue.shift(); 
        }

        // Record the result when we have a full window
        if (i >= k - 1) {
            if (queue.length) {
                result.push(arr[queue[0]]);
            } else {
                result.push(0);
            }
        }
    }

    return result;
}
