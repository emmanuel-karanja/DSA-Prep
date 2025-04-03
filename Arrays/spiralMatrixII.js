/**Given an integer n, generate an n x n matrix filled with elements from 1 to n² in spiral order. */

/** Given an integer n, generate an n x n matrix filled with elements from 1 to n² in spiral order. */

function generateSpiralMatrix(n) {
    const result = Array.from({ length: n }, () => Array(n).fill(0));

    let top = 0, bottom = n - 1;
    let left = 0, right = n - 1;
    let num = 1;

    while (top <= bottom && left <= right) {
        // Left to Right
        for (let j = left; j <= right; j++) {
            result[top][j] = num++;
        }
        top++;

        // Top to Bottom
        for (let i = top; i <= bottom; i++) {
            result[i][right] = num++;
        }
        right--;

        // Right to Left
        if (top <= bottom) {
            for (let j = right; j >= left; j--) {
                result[bottom][j] = num++;
            }
            bottom--;
        }

        // Bottom to Top
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result[i][left] = num++;
            }
            left++;
        }
    }

    return result;
}

// Example usage:
console.log(generateSpiralMatrix(3));
