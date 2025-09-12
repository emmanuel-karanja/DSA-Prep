/*#*/
/**
 * Problem Statement:
 * -----------------
 * Evaluate the value of an arithmetic expression in Reverse Polish Notation (RPN).
 * 
 * In Reverse Polish Notation, every operator follows all of its operands.
 * For example:
 * - The RPN expression ["2","1","+","3","*"] evaluates to ((2 + 1) * 3) = 9
 * - The RPN expression ["4","13","5","/","+"] evaluates to (4 + (13 / 5)) = 6
 * 
 * Valid operators are: +, -, *, /
 * Each operand may be an integer or another expression.
 * Division between two integers should truncate toward zero.
 * 
 * Intuition:
 * ----------
 * Use a stack to keep track of operands.
 * 1. Iterate through each token in the input array.
 * 2. If the token is a number, push it onto the stack.
 * 3. If the token is an operator:
 *    - Pop the top two numbers from the stack (right-hand side first).
 *    - Apply the operator.
 *    - Push the result back onto the stack.
 * 4. At the end, the stack will have a single element which is the result.
 * 
 * Example:
 * ----------
 * Input: ["2","1","+","3","*"]
 * Step 1: Push 2, Push 1
 * Step 2: Encounter "+", pop 1 and 2 -> 2+1=3, push 3
 * Step 3: Push 3
 * Step 4: Encounter "*", pop 3 and 3 -> 3*3=9, push 9
 * Output: 9
 */

function evalRPN(tokens) {
    const stack = []; // Stack to hold numbers during evaluation

    for (const t of tokens) {
        // If the token is an operator
        if ("+-*/".includes(t)) {
            const b = stack.pop(); // Second operand
            const a = stack.pop(); // First operand
            // Perform operation and push result back to stack
            stack.push(
                t === '+' ? a + b :
                t === '-' ? a - b :
                t === '*' ? a * b :
                Math.trunc(a / b) // truncate division toward zero
            );
        } else {
            // If token is a number, parse it and push to stack
            stack.push(parseInt(t));
        }
    }

    // Final result is the only element in stack
    return stack[0];
}

// Driver code to test the function
const testCases = [
    { tokens: ["2","1","+","3","*"], expected: 9 },
    { tokens: ["4","13","5","/","+"], expected: 6 },
    { tokens: ["10","6","9","3","+","-11","*","/","*","17","+","5","+"], expected: 22 }
];

testCases.forEach(({tokens, expected}, i) => {
    const result = evalRPN(tokens);
    console.log(`Test Case ${i + 1}: Expected = ${expected}, Got = ${result}`);
});
