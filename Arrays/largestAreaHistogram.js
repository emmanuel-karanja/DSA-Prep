/**
 * LOGIC 
 * 
 * Divice and conquer by partitioning the array in left and right parts around the minHeight(max Area is bound by the
 * minimum height)
 * 1. Find the minimum height in the current range 
       [l,r], since the largest rectangle spanning the entire range must be bounded by this height.
   2. Compute the area using this minimum height:

     Area=min height×(right index−left index+1)
   3. Recursively find the maximum area in the left and right subarrays (dividing the problem into smaller subproblems).
         Return the maximum of:
           - Left subarray’s max rectangle
           - Right subarray’s max rectangle
           - Rectangle spanning both, bounded by the smallest height 
    
    Worst Case: Time O(N^2)
    Average Case: Time(nlongn)
           
    */

function largestRectangleArea(heights) {

    function computeMaxArea(left, right) {
        if (left > right) return 0;

        // Find the index of the minimum height in range [left, right]
        let minIndex = left;
        for (let i = left; i <= right; i++) {
            if (heights[i] < heights[minIndex]) {
                minIndex = i;
            }
        }

        // Calculate the max area bounded by the minimum height
        let areaWithMinHeight = heights[minIndex] * (right - left + 1);

        // Recursively find max area in left and right partitions
        let leftArea = computeMaxArea(left, minIndex - 1);
        let rightArea = computeMaxArea(minIndex + 1, right);

        // Return the max of the three
        return Math.max(leftArea, areaWithMinHeight, rightArea);
    }

    return computeMaxArea(0, heights.length - 1);
}

// Example usage:
let histogram = [2, 1, 5, 6, 2, 3];
console.log(largestRectangleArea(histogram)); // Output: 10


//Using a monotonic stack in O(n) time

function largestRectangleArea(heights) {
    const stack = []; // Monotonic increasing stack (stores indices)
    let maxArea = 0;

    // Add a sentinel bar of height 0 at the end to flush out the stack
    heights.push(0);

    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            const poppedIndex = stack.pop();
            const height = heights[poppedIndex];

            // Width is current index - index of previous smaller element - 1
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

            const area = height * width;
            maxArea = Math.max(maxArea, area);
        }

        stack.push(i);
    }

    return maxArea;
}


// Example Usage
console.log(largestRectangleArea([2,1,5,6,2,3])); // Output: 10
