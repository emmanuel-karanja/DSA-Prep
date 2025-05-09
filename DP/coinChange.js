/** */

function coinChangeRecursive(coins, amount) {
    if (amount === 0) return 0;
    if (amount < 0) return Infinity;

    let minCoins = Infinity;

    for (let coinValue of coins) {
        const res = coinChangeRecursive(coins, amount - coinValue);
        if (res !== Infinity) {
            minCoins = Math.min(minCoins, res + 1);
        }
    }

    return minCoins;
}



function coinChange(coins, amount) {
    if (amount < 0) return -1; // Edge case: negative amount
    if (amount === 0) return 0; // Edge case: zero amount
    if (coins.length === 0) return -1; // Edge case: empty coins array

    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (let coinValue of coins) {
            if (i - coinValue >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coinValue] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}


// Example usage
console.log(coinChange([1, 2, 5], 11)); // Output: 3 (5 + 5 + 1)
console.log(coinChange([2], 3));        // Output: -1 (impossible)
console.log(coinChange([1], 0));    