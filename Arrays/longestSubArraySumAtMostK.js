/**Use a sliding window with left and right, right moves as we sum and when we hit
 * a sum greater than k, move the left pointer and remove the left most from the sum so far
 */

function longestSubarrayWithSumAtMostK(arr, k) {
    let left = 0;
    let sum = 0;
    let maxLen = 0;

    for (let right = 0; right < arr.length; right++) {
        sum += arr[right];

        // Shrink the window if sum exceeds k
        while (sum > k) {
            sum -= arr[left];
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}
