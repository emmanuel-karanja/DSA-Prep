/** LOGIC
 * 
 * How to create the current row.
 * 
 * 1. We always have 1 at each end.
 * 2. Start with an empty triangle.
 * 3. Create an array of 1s
 * 4. j is the term we use for iteration over the numbers we need to fill it begins at 1 and ends at i-1
 * 
 */

function generatePascalsTriangle(n) {
    let triangle = [];
    
    for (let i = 0; i < n; i++) {
        //they always start with 1.
        let currentRow= Array(i + 1).fill(1);  // Start row with 1s
        
        //j starts from position 1 and terminates at i-1
        for (let j = 1; j < i; j++) { 
            currentRow[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];  // Sum of two above
        }
        
        triangle.push(row);
    }
    
    return triangle;
}

// Example Usage
console.log(generatePascalsTriangle(5));

//Next using Combinatorial formulae.

function generateRow(n) {
    let row = [1];
    
    for (let k = 1; k < n; k++) {
        row.push(row[k - 1] * (n - k) / k);
    }
    
    return row;
}

function generatePascalsTriangle(n) {
    let triangle = [];
    
    for (let i = 0; i < n; i++) {
        triangle.push(generateRow(i + 1));
    }
    
    return triangle;
}

// Example Usage
console.log(generatePascalsTriangle(5));

