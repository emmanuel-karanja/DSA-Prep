function rotateMatrix90(matrix) {
    const n = matrix.length;

    // Step 1: Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // Swap elements matrix[i][j] with matrix[j][i]
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
            //this also works:  [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // Step 2: Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }

    return matrix;
}



// Test case
const testMatrix = [
    [1, 2, 3,10],
    [4, 5, 6,11],
    [7, 8, 9,12],
    [13,14,15,16]
];

console.log(rotateMatrix90(testMatrix));
