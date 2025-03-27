/**iven a binary array nums (only 0s and 1s), 
 * and an integer k, return the length of the longest subarray that contains at most k zeroes. 
 * 
 * LOGIC:
 * 
 1. Use a sliding window to track a subarray, and only allow at most k zeroes in the current window.
 2. Expand the right boundary (right) of the window
 3. Count the number of zeroes inside the window

If zeroes > k, shrink from the left (left) until valid again
 * */

function longestOnes(nums, k) {
    let left = 0, right = 0;
    let maxLen = 0;
    let zeroCount = 0;

    for (right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeroCount++;

        while (zeroCount > k) {
            if (nums[left] === 0) zeroCount--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}
