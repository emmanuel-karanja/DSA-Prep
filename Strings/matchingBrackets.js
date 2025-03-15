/** Check if a given string has balanced parentheses.
 * 
 * LOGIC:
 * 
 * 1. Store the known brackets in a Map, the key is the opening bracket and the value is the closing bracket.
 * 2. Use a stack to keep track of the brackets encountered in the string.
 * 3. Iterate over the string, use the current char as a key to get the matching bracket, if not found,
 *    push it into the stack, if it's pop the stack if the popped element doesn't match the value return false
 * 4. Otherwise return true
 */

function isValid(s) {
    let stack = [];
    let map = { ")": "(", "}": "{", "]": "[" };

    for (let char of s) {
        if (!map[char]) {
            stack.push(char);
        } else {
            if (stack.pop() !== map[char]) return false;
        }
    }

    return stack.length === 0;
}

// Test
console.log(isValid("()[]{}")); // Output: true
console.log(isValid("(]")); // Output: false
