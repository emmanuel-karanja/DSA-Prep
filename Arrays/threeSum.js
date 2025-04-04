/**PROBLEM
 * Given an array of integers nums, return all unique triplets [nums[i], nums[j], nums[k]] such that:
   i != j != k
  nums[i] + nums[j] + nums[k] == 0

The solution should not contain duplicate triplets.
 *
SOLUTION
 * Three-Pointer (Optimal)

i is fixed
left  starts at i+1
and right starts at the end of the array
Logic:
1. Sort the array → Helps in avoiding duplicates.
2. Fix one element (i), then use Two-Pointer approach to find b + c = -a.
3. Skip duplicates after processing each element.

Time O(n^2), space O(1)

KEY WITH TWO POINTERS:

1. Do the pointers begin on the same side or not?
2. When do we update any of the pointers? 
3. What's the termination condition?-->if the pointers converge i.e. start on opposite sides the condition is left != right
   or until left===right. If they start on the same side, it's until right =end of array
4. Also,when do we initialize each of them?
*/

function threeSum(nums) {
    // Step 1: Sort the array
    nums.sort((a, b) => a - b);
    
    const result = [];
    
    // Step 2: Iterate through the array
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicate values for 'i'
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1; // Left pointer
        let right = nums.length - 1; // Right pointer
        
        // Step 3: Use two pointers to find the other two elements
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                // If we find a triplet, add it to the result
                result.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicates for the 'left' pointer
                while (left < right && nums[left] === nums[left + 1]) left++;
                
                // Skip duplicates for the 'right' pointer
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                // Move both pointers
                left++;
                right--;
            } else if (sum < 0) {
                // If the sum is less than zero, move the left pointer to the right
                left++;
            } else {
                // If the sum is greater than zero, move the right pointer to the left
                right--;
            }
        }
    }
    
    return result;
}

// Example usage:
const nums = [-1, 0, 1, 2, -1, -4];
const result = threeSum(nums);
console.log(result);  // Output: [[-1, -1, 2], [-1, 0, 1]]
