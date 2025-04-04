/**Target Sum Problem is about determining if there's a subset of numbers from a given array that
 *  adds up to a specific target sum */

function canSum(nums, target) {
    const dp = Array(target + 1).fill(false);
    dp[0] = true; // Base case: there's always a way to make sum 0 (empty set)

    for (let i = 0; i <= target; i++) {
        if (dp[i]) {
            for (let num of nums) {
                if (i + num <= target) {
                    dp[i + num] = true;
                }
            }
        }
    }
    return dp[target];
}

// Example usage:
const nums = [2, 3, 7];
const target = 10;
console.log(canSum(nums, target)); // Output: true (3 + 7 = 10)
