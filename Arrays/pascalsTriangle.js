function generatePascalsTriangle(n) {
    let triangle = [];
    
    for (let i = 0; i < n; i++) {
        let row = Array(i + 1).fill(1);  // Start row with 1s
        
        for (let j = 1; j < i; j++) {
            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];  // Sum of two above
        }
        
        triangle.push(row);
    }
    
    return triangle;
}

// Example Usage
console.log(generatePascalsTriangle(5));
