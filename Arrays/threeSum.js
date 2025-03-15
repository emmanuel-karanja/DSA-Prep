/**Two-Pointer (Optimal)
Logic:
Sort the array → Helps in avoiding duplicates.
Fix one element (i), then use Two-Pointer approach to find b + c = -a.
Skip duplicates after processing each element.

Time O(n^2), space O(1)
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
