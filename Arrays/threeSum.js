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
    nums.sort((a, b) => a - b);  // Step 1: Sort the array
    let result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;  // Skip duplicates

        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                while (left < right && nums[left] === nums[left + 1]) left++;  // Skip duplicates
                while (left < right && nums[right] === nums[right - 1]) right--;  // Skip duplicates
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;  // Need a larger number
            } else {
                right--; // Need a smaller number
            }
        }
    }

    return result;
}
