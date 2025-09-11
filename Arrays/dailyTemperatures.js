/**
 * Daily Temperatures Problem
 *
 * Logic:
 * 1. Use a monotonic decreasing stack to keep indices of unresolved temperatures.
 * 2. For each temperature:
 *    - While current temperature is higher than the top of the stack:
 *       - Pop the index from stack.
 *       - Compute days waited: current index - popped index.
 *    - Push current index onto the stack.
 * 3. Fill answer array with the number of days until a warmer temperature.
 *
 * Time Complexity: O(n) - each index is pushed and popped at most once
 * Space Complexity: O(n) - for the stack and answer array
 */

function dailyTemperatures(T) {
    const n = T.length;
    const answer = new Array(n).fill(0);
    const stack = []; // stores indices

    for (let i = 0; i < n; i++) {
        // Resolve previous days waiting for a warmer temperature
        while (stack.length > 0 && T[i] > T[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            answer[prevIndex] = i - prevIndex; // number of days waited
        }
        // Push current day's index onto stack
        stack.push(i);
    }

    return answer;
}

// Example usage
const T = [73, 74, 75, 71, 69, 72, 76, 73];
console.log(dailyTemperatures(T)); // Output: [1, 1, 4, 2, 1, 1, 0, 0]
