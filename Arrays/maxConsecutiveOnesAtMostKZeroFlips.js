/**Given a binary array nums and an integer k, return the maximum number of 
 * consecutive 1s in the array if you can flip at most k 0s.

LOGIC:
We want the longest window where the number of 0s is ≤ k.
If 0s > k, shrink the window from the left.


 */

function longestOnes(nums, k) {
    let left = 0, right = 0;
    let maxLen = 0;
    let zeros = 0;

    while (right < nums.length) {
        if (nums[right] === 0) zeros++;

        while (zeros > k) {
            if (nums[left] === 0) zeros--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
        right++;
    }

    return maxLen;
}
console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)); 
// Output: 6 (flip the two 0s at indices 3 and 4)
