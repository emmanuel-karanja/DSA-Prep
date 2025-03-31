/**This is a variation of k-sum, specifically 4-sum.
Here's how you can think of it:

1.Sort the array. This helps skip duplicates and use two pointers efficiently.
2.Fix the first two numbers using two loops.
3.Use two pointers to find the remaining two numbers that add up to target - (first + second).
4.Skip duplicates as you go. */

function fourSum(nums, target) {
    nums.sort((a, b) => a - b);
    const result = [];
    const n = nums.length;

    for (let i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates for i

        for (let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue; // Skip duplicates for j

            let left = j + 1;
            let right = n - 1;

            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];

                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    left++;
                    right--;

                    // Skip duplicates
                    while (left < right && nums[left] === nums[left - 1]) left++;
                    while (left < right && nums[right] === nums[right + 1]) right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return result;
}

fourSum([1, 0, -1, 0, -2, 2], 0)
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
