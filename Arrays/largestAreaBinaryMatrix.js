/**Basically, start from the top row and keep combining them i.e. 
 *   if arr[i] > 0 and arr2[i] > 0 then merged[i]=arr1[i]=arr2[i] 
 * 
 *   if arr[i]===0 then result[i]=0;
 * 
 *   else result[i]=1;
 * 
 *  After each merge, find the largestAreaHistogram
 * 
 * Codify the merging functionality into a function you can reuse.
 * 
 *  This is hard hard problem i.e. finding the largestAReaHistogram is hard, and then you've got to be able to use
 *  it intuitively.
 * 
 * 
 * */

function largestRectangleHistogram(heights) {
    let stack = [];
    let maxArea = 0;
    heights.push(0);  // Add a sentinel height to clear stack at end

    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            let h = heights[stack.pop()];
            let w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }
    heights.pop(); // Remove sentinel
    return maxArea;
}

function maximalRectangle(matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) return 0;

    let rows = matrix.length;
    let cols = matrix[0].length;
    let heights = Array(cols).fill(0);
    let maxArea = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            heights[j] = matrix[i][j] === 0 ? 0 : heights[j] + 1;
        }
        maxArea = Math.max(maxArea, largestRectangleHistogram(heights));
    }

    return maxArea;
}

// Example usage
let matrix = [
    [1, 0, 1, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0]
];

console.log(maximalRectangle(matrix));  // Output: 6
