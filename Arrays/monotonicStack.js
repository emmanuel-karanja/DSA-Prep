/**We pre-compute an array that tells us given the current element at nums[i] from the result array, we can quickly
 * look up the next greater element in the array. So, we preprocess the array to get the next greater element.
 * 
 * LOGIC:
 * 
 * GOAL: We are looking for the NEAREST greater or smaller than the current element at index i in the array.
 * 
 * 1. Iterate over the array starting from the right (for  next greater than) or the left (for next smaller than)
 * 2. If stack is not empty, we look at the top element, if it's lesser or equal to (or greater), we pop the top element and continue
 *    popping stack until the element at the top is greater or smaller than the current element.
 * 3. If stack is not empty, we know the current top is the next smaller or greater.
 * 4. We add it to the result for the current index i.
 * 5. Push the current element on to the stack.
 * 
 * 
 * *Our end goal is not generate a result array such that at each matching index, the result will tell us this is the next greater
 *  than or smaller than the current element pointed to by the current matching index.
 * 
 * Time O(n) single pass and Space O(n) due to the result array
 * 
 * 1. P
 */


//monotonic decreasing
function nextGreaterElements(nums) {
    let result = new Array(nums.length).fill(-1);
    let stack = []; // Monotonic decreasing stack

    for (let i = nums.length - 1; i >= 0; i--) {
        // Remove smaller elements from stack
        while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
            stack.pop();
        }
        // If stack is not empty, top is the next greater element
        if (stack.length > 0) {
            result[i] = stack[stack.length - 1];
        }
        // Push current number onto stack
        stack.push(nums[i]);
    }
    return result;
}

// Example
console.log(nextGreaterElements([2, 1, 2, 4, 3])); 
// Output: [4, 2, 4, -1, -1]


//next smaller element - monotonic increasing
function nextSmallerElements(arr) {
    let stack = [];  // Stores indices of elements in increasing order
    let result = new Array(arr.length).fill(-1); // Default to -1 if no smaller exists

    for (let i = 0; i < arr.length; i++) {
        while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
            let index = stack.pop();
            result[index] = arr[i]; // The current element is the next smaller
        }
        stack.push(i);
    }
    return result;
}

// Example Usage:
console.log(nextSmallerElements([2, 1, 5, 6, 2, 3])); 
// Output: [1, -1, 2, 2, -1, -1]
