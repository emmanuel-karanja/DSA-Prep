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
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (let coinValue of coins) {
            if (i - coinValue >= 0) {
                //either use a current coin or skip it.
                dp[i] = Math.min(dp[i], dp[i - coinValue] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}
