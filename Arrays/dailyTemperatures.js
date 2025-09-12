/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given a list of daily temperatures T, return a list such that, for each day in the input,
 * tells you how many days you would have to wait until a warmer temperature.
 * If there is no future day for which this is possible, put 0 instead.
 * 
 * Example:
 * ----------
 * Input: [73, 74, 75, 71, 69, 72, 76, 73]
 * Output: [1, 1, 4, 2, 1, 1, 0, 0]
 * 
 * Explanation:
 * - For day 0 (73), the next warmer temperature is on day 1 (74) -> 1 day
 * - For day 1 (74), the next warmer temperature is on day 2 (75) -> 1 day
 * - For day 2 (75), the next warmer temperature is on day 6 (76) -> 4 days
 * - For day 3 (71), the next warmer temperature is on day 5 (72) -> 2 days
 * - For day 4 (69), the next warmer temperature is on day 5 (72) -> 1 day
 * - For day 5 (72), the next warmer temperature is on day 6 (76) -> 1 day
 * - For day 6 (76), no warmer day ahead -> 0
 * - For day 7 (73), no warmer day ahead -> 0
 * 
 * Intuition:
 * ----------
 * Use a stack to keep track of indices of temperatures for which we haven't found a warmer day yet.
 * 1. Iterate through each day.
 * 2. While the stack is not empty and the current temperature is higher than the temperature
 *    at the index at the top of the stack:
 *      - Pop that index from the stack
 *      - Compute the difference in days (current index - popped index) and store in result
 * 3. Push the current index onto the stack.
 * 4. At the end, indices still in the stack have no warmer future day, so their result is already 0.
 */

function dailyTemperatures(T) {
    const res = Array(T.length).fill(0); // Initialize result array with 0
    const stack = []; // Stack to keep indices of unresolved temperatures

    for (let i = 0; i < T.length; i++) {
        // While current temperature is higher than temperature at stack top
        while (stack.length && T[i] > T[stack[stack.length - 1]]) {
            const idx = stack.pop(); // Get the index of previous cooler temperature
            res[idx] = i - idx;      // Compute the number of days until a warmer temperature
        }
        stack.push(i); // Push current day's index to stack
    }

    return res;
}

// Driver code to test the function
const testCases = [
    { T: [73, 74, 75, 71, 69, 72, 76, 73], expected: [1, 1, 4, 2, 1, 1, 0, 0] },
    { T: [30, 40, 50, 60], expected: [1, 1, 1, 0] },
    { T: [30, 60, 90], expected: [1, 1, 0] }
];

testCases.forEach(({T, expected}, i) => {
    const result = dailyTemperatures(T);
    console.log(`Test Case ${i + 1}: Expected = [${expected}], Got = [${result}]`);
});
