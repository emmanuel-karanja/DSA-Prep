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