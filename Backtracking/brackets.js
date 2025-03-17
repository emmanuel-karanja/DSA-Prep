/**The problem requires generating all valid combinations of balanced parentheses (or brackets) given N pairs.


 * LOGIC:
 * We maintain the count of:

1. Open brackets (() → Must not exceed N
2. Close brackets ()) → Must not exceed the number of open brackets placed so far.
 */

function generateBalancedBrackets(n) {
    let result = [];

    function backtrack(candidate, openCount, closeCount) {
        // Base case: If we have used all brackets, add to result
        if (openCount === n && closeCount === n) {
            result.push(candidate);
            return;
        }

        // Try adding an open bracket if still available
        if (openCount < n) {
            backtrack(candidate + "(", openCount + 1, closeCount);
        }

        // Try adding a close bracket if it does not exceed open
        if (closeCount < openCount) {
            backtrack(candidate + ")", openCount, closeCount + 1);
        }
    }

    backtrack("", 0, 0);
    return result;
}

// Example Usage
console.log(generateBalancedBrackets(3));
