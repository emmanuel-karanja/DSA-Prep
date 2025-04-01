/**Given an integer n, generate an n x n matrix filled with elements from 1 to n² in spiral order. */

function spiralTransform(inputMatrix) {
    const m = inputMatrix.length;
    const n = inputMatrix[0].length;

    const result = Array.from({ length: m }, () => Array(n).fill(0));

    let top = 0, bottom = m - 1;
    let left = 0, right = n - 1;
    let index = 0;

    // Flatten the original matrix row by row
    const flat = inputMatrix.flat();

    while (top <= bottom && left <= right) {
        // Left to Right
        for (let j = left; j <= right; j++) {
            result[top][j] = flat[index++];
        }
        top++;

        // Top to Bottom
        for (let i = top; i <= bottom; i++) {
            result[i][right] = flat[index++];
        }
        right--;

        // Right to Left
        if (top <= bottom) {
            for (let j = right; j >= left; j--) {
                result[bottom][j] = flat[index++];
            }
            bottom--;
        }

        // Bottom to Top
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result[i][left] = flat[index++];
            }
            left++;
        }
    }

    return result;
}


const test=[
    [ 1, 2, 3 ],
    [ 8, 9, 4 ],
    [ 7, 6, 5 ]
   ]

console.log(spiralTransform(test))