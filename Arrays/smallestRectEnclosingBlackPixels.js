/**Find the smallest rectangle enclosing the black pixels in a binary matrix
 * 
 * LOGIC:
 * 
 * Traverse the matrix to find the topmost, bottommost, leftmost, and rightmost black pixels.
The rectangle will be formed by these boundaries.

left, right, top, bottom refers to the edges, therefore, left increases down y, and right down y as well.
ditto bottom and top increase with x. Think of it as an inverted cartesian plane where the origin is the top
left corner. X increases left to right and y increases top to bottom.
 */

function minArea(image, x, y) {
    let top = x, bottom = x, left = y, right = y;
    
    // Traverse the rows to find the top and bottom boundaries
    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[i].length; j++) {
            if (image[i][j] === '1') {
                top = Math.min(top, i);
                bottom = Math.max(bottom, i);
                left = Math.min(left, j);
                right = Math.max(right, j);
            }
        }
    }
    
    return (right - left + 1) * (bottom - top + 1);
}

// Driver Code: Binary image as an array of strings
const image = [
    "0010",
    "0110",
    "0100"
];

const x = 0; // Row position of the pixel (for reference)
const y = 2; // Column position of the pixel (for reference)

console.log(minArea(image, x, y));  // Output: 6
