/**You are given:

A knapsack that can carry up to W weight units.

A list of N items, each with:

A weight w[i]
A value v[i]

Goal:
Maximize the total value in the knapsack without exceeding the total weight capacity W.

The catch?
You can either take an item or leave it — you can't take a fraction of it. That’s why it’s called 0/1 Knapsack:

1 = take the item
0 = leave it

 */

function knapsack01(items, capacity) {
    const itemCount = items.length;
  
    // Create a 2D array of size (n+1) x (capacity+1)
    const dp = Array.from({ length: itemCount + 1 }, () =>
      Array(capacity + 1).fill(0)
    );  //we fill with 0 , to avoid the ugly if w====0 or i===0 cases
  
    // Build the table
    for (let i = 1; i <= itemCount; i++) {
      for (let w = 0; w <= capacity; w++) {
        const { currentItemWeight, currentItemValue } = items[i - 1];
  
        if (currentItemWeight > w) { //SKIP CASE
          // Can't take the item
          dp[i][w] = dp[i - 1][w];
        } else { //YIELD CASE
          //skip the item or pick it, when we pick, it yields its value
          dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - currentItemWeight] + currentItemValue);
        }
      }
    }
  
    return dp[n][capacity]; // max value with full capacity
  }
  
  // Each item has a weight and value
const items = [
    { weight: 10, value: 60 },
    { weight: 20, value: 100 },
    { weight: 30, value: 120 },
  ];
  
const capacity = 50; // Knapsack max weight
const maxValue = knapsack01(items, capacity);
console.log("Maximum value you can carry:", maxValue); // Should log 220

  