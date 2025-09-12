/*#*/
/**
 * Problem Statement:
 * -----------------
 * Design a class to find the kth largest element in a stream of numbers.
 * 
 * - Implement the KthLargest class:
 *   - KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
 *   - int add(int val) Appends the integer val to the stream and returns the kth largest element in the stream.
 * 
 * Example:
 * ----------
 * Input:
 * ["KthLargest","add","add","add","add","add"]
 * [[3,[4,5,8,2]],[3],[5],[10],[9],[4]]
 * Output:
 * [null,4,5,5,8,8]
 * 
 * Intuition:
 * ----------
 * 1. Keep a sorted array of the k largest elements seen so far.
 * 2. When adding a new element:
 *    - Insert it into the array.
 *    - Sort the array.
 *    - If length exceeds k, remove the smallest element.
 * 3. The kth largest element is always the smallest in this array.
 */

class KthLargest {
    constructor(k, nums) {
        this.k = k;
        // Keep only the k largest elements initially
        this.heap = nums.sort((a, b) => a - b).slice(-k);
    }

    add(val) {
        this.heap.push(val);               // Add new value
        this.heap.sort((a, b) => a - b);   // Sort ascending
        if (this.heap.length > this.k) {   // Keep only k largest elements
            this.heap.shift();             // Remove smallest
        }
        return this.heap[0];               // kth largest element
    }
}

// Driver code to test KthLargest
const kthLargest = new KthLargest(3, [4,5,8,2]);
console.log(kthLargest.add(3));  // Expected: 4
console.log(kthLargest.add(5));  // Expected: 5
console.log(kthLargest.add(10)); // Expected: 5
console.log(kthLargest.add(9));  // Expected: 8
console.log(kthLargest.add(4));  // Expected: 8
