/**Given an mxn matrix, present it in the spiral order
 * 
 * LOGIC:
 * 
 * 1. Maintain for pointers: top, bottom,left,and right
 * 2. Iterate over the matrix
 */
function spiralOrder(matrix) {
    const result = [];

    if (matrix.length === 0) return result;

    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // Move right
        for (let j = left; j <= right; j++) {
            result.push(matrix[top][j]);
        }
        top++;

        // Move down
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;

        // Move left
        if (top <= bottom) {
            for (let j = right; j >= left; j--) {
                result.push(matrix[bottom][j]);
            }
            bottom--;
        }

        // Move up
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++;
        }
    }

    return result;
}
