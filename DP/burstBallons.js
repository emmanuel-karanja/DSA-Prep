/*#*/
/**
 * Problem Definition:
 * -------------------
 * Given n balloons, each balloon has a number on it. You are asked to burst all the balloons.
 * If you burst balloon k, you get nums[i] * nums[k] * nums[j] coins where i and j are the 
 * adjacent balloons left and right of k after bursting. 
 * Find the maximum coins you can collect by bursting balloons wisely.
 * (LeetCode 312: Burst Balloons)
 *
 * Example:
 *   nums = [3,1,5,8] -> Expected result = 167
 *
 * Intuition:
 * ----------
 * Bursting balloons in order affects future choices. Instead of choosing which to burst first,
 * think in reverse: choose which balloon to burst **last** in a range.
 * Add two "virtual balloons" with value 1 on each end to simplify edge handling.
 * Use dynamic programming where dp[i][j] represents the maximum coins obtainable 
 * by bursting all balloons between i and j (exclusive).
 *
 * Logic:
 * ------
 * 1. Pad nums with 1 at both ends: nums = [1, ...nums, 1].
 * 2. Let dp[i][j] = maximum coins from bursting balloons strictly between i and j.
 * 3. Iterate over subarray lengths (len = 2 to n):
 *    - For each (i, j) = (start, start+len):
 *      - Try all positions k in (i, j) as the last balloon to burst:
 *        dp[i][j] = max(dp[i][j], dp[i][k] + dp[k][j] + nums[i]*nums[k]*nums[j])
 * 4. Final answer is dp[0][n-1].
 */

function maxCoins(nums) {
    nums = [1, ...nums, 1];          // Pad with 1 on both ends
    const n = nums.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    // len is the distance between i and j
    for (let len = 2; len < n; len++) {
        for (let i = 0; i + len < n; i++) {
            const j = i + len;
            for (let k = i + 1; k < j; k++) {
                dp[i][j] = Math.max(
                    dp[i][j],
                    dp[i][k] + dp[k][j] + nums[i] * nums[k] * nums[j]
                );
            }
        }
    }

    return dp[0][n - 1];
}

// -------- Driver Code --------
function main() {
    const nums = [3,1,5,8];
    const result = maxCoins(nums);
    console.log(`Balloons: [${nums.join(', ')}]`);
    console.log(`Maximum coins: ${result}`); // Expected: 167
}

main();
