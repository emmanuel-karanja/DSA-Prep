
/**Cyclic Sort is an efficient in-place sorting algorithm used when numbers are in a given range 
 * (e.g., 1 to N or 0 to N-1). It sorts an array without using extra space and works by placing each
 * number at its correct index.
 * 
 * LOGIC:
 * 
 * 1. Iterate through the array and check if the current number is at its correct position.
   2. If not in the correct position, swap it with the number at its intended position.
   3. Repeat the process until all elements are correctly placed.
 * 
 *  */

function cyclicSort(nums) {
    let i = 0;
    while (i < nums.length) {
        let correctIndex = nums[i] - 1;
        if (nums[i] !== nums[correctIndex]) {
            // Swap elements to their correct positions
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
        } else {
            i++;
        }
    }
    return nums;
}

// Test
console.log(cyclicSort([3, 1, 5, 4, 2])); // Output: [1, 2, 3, 4, 5]
