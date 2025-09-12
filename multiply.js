/*#*/
/**
 * Problem Definition:
 * -------------------
 * Given two non-negative integers `num1` and `num2` represented as strings, 
 * return the product of these two numbers, also as a string. 
 * You must implement the multiplication manually (without using BigInt or built-in 
 * arbitrary-precision libraries).
 *
 * Intuition:
 * ----------
 * This simulates the grade-school multiplication method:
 * - Multiply each digit of `num1` with each digit of `num2` from right to left.
 * - Keep track of carries and add partial products in the correct positions.
 * - Finally, remove leading zeros and return the result as a string.
 *
 * Logic:
 * ------
 * 1. Initialize an array `res` of length `m + n` (where m and n are lengths of `num1` and `num2`) 
 *    filled with zeros to store intermediate sums.
 * 2. Iterate backward through both strings:
 *    - Multiply digits `(num1[i] - '0') * (num2[j] - '0')`.
 *    - Add the product to the correct position in `res` using `i + j + 1`.
 *    - Manage carry by adding `Math.floor(sum / 10)` to `res[i + j]`.
 * 3. After finishing the multiplication, remove leading zeros.
 * 4. Join the array into a string and return it.
 */

function multiply(num1, num2) {
    const m = num1.length, n = num2.length;
    const res = Array(m + n).fill(0);
    
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const mul = (num1[i] - '0') * (num2[j] - '0');
            const sum = mul + res[i + j + 1];
            res[i + j + 1] = sum % 10;
            res[i + j] += Math.floor(sum / 10);
        }
    }
    
    while (res[0] === 0 && res.length > 1) 
        res.shift();
    
    return res.join('');
}

// -------- Driver Code --------
function main() {
    const num1 = "123";
    const num2 = "45";
    const result = multiply(num1, num2);
    console.log(`${num1} × ${num2} = ${result}`);
}

main();
