/*#/
/**
 * Problem Definition:
 * -------------------
 * Given an array `height` of non-negative integers where each element represents 
 * the height of a vertical line on the x-axis, find two lines that together 
 * with the x-axis form a container such that the container holds the most water.
 * Return the maximum amount of water a container can store.
 * (LeetCode 11: Container With Most Water)
 *
 * Example:
 *   height = [1,8,6,2,5,4,8,3,7]
 *   Output: 49
 *
 * Intuition:
 * ----------
 * Use a two-pointer approach:
 * - Start with the widest container (first and last lines).
 * - Calculate the area and update the maximum if it's larger.
 * - Move the pointer pointing to the shorter line inward, 
 *   because moving the taller line inward cannot increase the area 
 *   (width decreases and height is limited by the shorter line).
 *
 * Logic:
 * ------
 * 1. Initialize two pointers: left = 0, right = n-1, and maxA = 0.
 * 2. While left < right:
 *    - Compute area = min(height[left], height[right]) * (right - left).
 *    - Update maxA = max(maxA, area).
 *    - Move the pointer of the shorter line inward:
 *      * If height[left] < height[right], increment left.
 *      * Else, decrement right.
 * 3. Return maxA after the loop.
 *
 * Complexity:
 * -----------
 * - Time: O(n) — each pointer moves at most n times.
 * - Space: O(1) — constant extra space.
 */

function maxArea(height) {
    let left = 0, right = height.length - 1, maxA = 0;
    while (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left);
        maxA = Math.max(maxA, area);
        if (height[left] < height[right]) {
            left++;
        }else {
            right--;
        }
    }
    return maxA;
}

// -------- Driver Code --------
function main() {
    const height = [1,8,6,2,5,4,8,3,7];
    const result = maxArea(height);
    console.log(`Heights: [${height.join(', ')}]`);
    console.log(`Maximum water area: ${result}`); // Expected: 49
}

main();
