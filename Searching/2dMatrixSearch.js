/**
 * Search a 2D Matrix
 *
 * Problem Statement:
 * You are given an m x n integer matrix `matrix` with the following properties:
 * 1. Each row is sorted in ascending order from left to right.
 * 2. The first integer of each row is greater than the last integer of the previous row.
 * 
 * Given an integer `target`, return true if `target` exists in the matrix, or false otherwise.
 *
 * Example:
 * matrix = [
 *   [1, 3, 5, 7],
 *   [10, 11, 16, 20],
 *   [23, 30, 34, 50]
 * ]
 * target = 3 → Output: true
 * target = 13 → Output: false
 *
 * Logic:
 * - Since the matrix can be treated as a sorted 1D array (row-wise), we can perform a binary search.
 * - Map a 1D index to 2D coordinates: row = Math.floor(index / n), col = index % n
 *
 * Time Complexity: O(log(m * n))
 * Space Complexity: O(1)
 */

function searchMatrix(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;
    
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0;
    let right = m * n - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const row = Math.floor(mid / n);
        const col = mid % n;
        const midValue = matrix[row][col];

        if (midValue === target) {
            return true;
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}

// Example usage
const matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
];
console.log(searchMatrix(matrix, 3));  // Output: true
console.log(searchMatrix(matrix, 13)); // Output: false
