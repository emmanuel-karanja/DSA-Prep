/*#*/
/**
 * Problem Definition:
 * -------------------
 * Given an array of positive integers `nums`, determine if it can be partitioned into 
 * two subsets whose sums are equal. This is the "Partition Equal Subset Sum" problem.
 *
 * Intuition:
 * ----------
 * If the total sum of `nums` is odd, it’s impossible to split into two equal halves.
 * If even, check whether any subset sums to half the total. If such a subset exists, 
 * the remaining numbers form the other half—making equal partitions possible.
 *
 * Logic:
 * ------
 * 1. Compute the total sum of `nums`. If odd, return false.
 * 2. Let `target = sum / 2`. Use a 1D boolean DP array `dp` of length `target + 1`.
 *    - `dp[i]` means: "Is a subset sum of `i` achievable?"
 * 3. Initialize `dp[0] = true` (sum of 0 is always achievable with no elements).
 * 4. For each `num` in `nums`, iterate `i` backward from `target` to `num`:
 *      dp[i] = dp[i] || dp[i - num];
 *    (Iterating backward ensures each number is only used once per iteration.)
 * 5. Return `dp[target]`.
 */

function canPartition(nums) {
    const sum = nums.reduce((a,b)=>a+b,0);
    if (sum % 2 !== 0) return false;     // Odd sum cannot be split equally
    const target = sum / 2;
    const dp = Array(target + 1).fill(false);
    dp[0] = true;                        // Base case: sum of 0 is always possible
    
    for (const num of nums) {
        for (let i = target; i >= num; i--) {
            dp[i] = dp[i] || dp[i - num];
        }
    }
    return dp[target];
}

// -------- Driver Code --------
function main() {
    const nums = [1, 5, 11, 5]; // Example input
    const result = canPartition(nums);
    console.log(`Can partition [${nums.join(', ')}]: ${result}`);
}

main();
