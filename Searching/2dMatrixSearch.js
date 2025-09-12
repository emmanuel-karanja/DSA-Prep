/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given an m x n matrix where:
 *  - Integers in each row are sorted in ascending order from left to right.
 *  - Integers in each column are sorted in ascending order from top to bottom.
 * 
 * Write a function to determine if a given 'target' exists in the matrix.
 * 
 * Example:
 * ----------
 * Input: 
 * matrix = [
 *   [1, 4, 7, 11, 15],
 *   [2, 5, 8, 12, 19],
 *   [3, 6, 9, 16, 22],
 *   [10, 13, 14, 17, 24],
 *   [18, 21, 23, 26, 30]
 * ], target = 5
 * Output: true
 * 
 * Input: same matrix, target = 20
 * Output: false
 * 
 * Intuition:
 * ----------
 * 1. Start from the top-right corner of the matrix.
 * 2. Compare the current element with the target:
 *    - If equal, return true.
 *    - If current > target, move left (decrease column) because all elements below are bigger.
 *    - If current < target, move down (increase row) because all elements to the left are smaller.
 * 3. Repeat until you find the target or go out of bounds.
 * 
 * This works in O(m + n) time.
 */

function searchMatrix(matrix, target) {
    let r = 0; // Start row
    let c = matrix[0].length - 1; // Start column (top-right corner)

    // Traverse the matrix
    while (r < matrix.length && c >= 0) {
        if (matrix[r][c] === target) {
            return true; // Found the target
        } else if (matrix[r][c] > target) {
            c--; // Move left
        } else {
            r++; // Move down
        }
    }

    return false; // Target not found
}

// Driver code to test the function
const testCases = [
    { matrix: [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30]
      ], target: 5, expected: true
    },
    { matrix: [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30]
      ], target: 20, expected: false
    }
];

testCases.forEach(({matrix, target, expected}, i) => {
    const result = searchMatrix(matrix, target);
    console.log(`Test Case ${i + 1}: Expected = ${expected}, Got = ${result}`);
});
