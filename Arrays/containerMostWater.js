/**
 * Container With Most Water - Two-Pointer Approach
 *
 * Logic:
 * 1. We have an array of heights representing vertical lines.
 * 2. Goal: Find two lines that together with x-axis form a container holding maximum water.
 * 3. Start with two pointers: left at index 0, right at last index (widest container).
 * 4. Calculate the area between left and right pointers:
 *      area = min(height[left], height[right]) * (right - left)
 * 5. Update maxArea if the current area is larger.
 * 6. Move the pointer pointing to the shorter line:
 *      - The shorter line limits the container's height.
 *      - Moving it inward might increase the area with a taller line.
 *      - Moving the taller line cannot increase area, so we keep it.
 * 7. Repeat steps 4-6 until pointers meet.
 * 8. Return the maximum area found.
 *
 * Time Complexity: O(n) - single pass through the array
 * Space Complexity: O(1) - constant extra space
 */

function maxArea(height) {
    let left = 0;                  // Start pointer
    let right = height.length - 1; // End pointer
    let maxArea = 0;               // Initialize max area

    while (left < right) {
        // Calculate current area
        let currentArea = Math.min(height[left], height[right]) * (right - left);
        maxArea = Math.max(maxArea, currentArea); // Update max area if larger

        // Move pointer of shorter line inward
        if (height[left] < height[right]) {
            left++; // Try taller line
        } else {
            right--; // Try taller line
        }
    }

    return maxArea;
}

// Example usage
const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(heights)); // Output: 49
