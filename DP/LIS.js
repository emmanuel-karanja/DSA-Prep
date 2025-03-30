/**Given an array of integers nums, find the length of the longest increasing subsequence. */

function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;

    const LIS= new Array(nums.length).fill(1); // dp[i] = LIS ending at i

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {// is it increasing?
                LIS[i] = Math.max(LIS[i], LIS[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}
