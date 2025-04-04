/**Given the stock prices of n days, for each day, find the number of consecutive days (including today)
 *  where the price was less than or equal to today's price.

In simpler terms, for each day's stock price, count how many days in the past (including today) 
the stock price was not greater than the current day's price.

e.g. 
prices = [100, 80, 60, 70, 60, 75, 85]

span = [1, 1, 1, 2, 1, 4, 6]

*/

//Brute force in O(N^2)
function stockSpanBruteForce(prices) {
    let span = new Array(prices.length).fill(1);

    for (let i = 1; i < prices.length; i++) {
        let count = 1;
        let j = i - 1;

        while (j >= 0 && prices[j] <= prices[i]) {
            count++;
            j--;
        }
        span[i] = count;
    }

    return span;
}

console.log("bruteForce:",stockSpanBruteForce([100, 80, 60, 70, 60, 75, 85]));
// Output: [1, 1, 1, 2, 1, 4, 6]


//Optimal using monotonic decreasing stack Time O(n)
function stockSpan(prices) {
    let span = new Array(prices.length);
    let stack = []; // Stack stores indices

    for (let i = 0; i < prices.length; i++) {
        // Remove elements from stack that are smaller or equal to current price
        while (stack.length > 0 && prices[i] >=prices[stack[stack.length - 1]] ) {
            stack.pop();
        }

        // Compute span:
        // If stack is empty, all previous elements were smaller => span = i + 1, we are including today
         //so we are adding 1 to i and the other side as well , what makes it different from the width calculation
         // for max area histogram
        // Otherwise, span = i - last greater element's index
        span[i] = stack.length === 0 ? i + 1 : i - stack[stack.length - 1];

        // Push the current index onto the stack
        stack.push(i);
    }

    return span;
}

// Test
console.log("optimal:",stockSpan([100, 80, 60, 70, 60, 75, 85]));
// Output: [1, 1, 1, 2, 1, 4, 6]
