/**You're given:

An integer k (maximum number of allowed transactions),
An array prices, where prices[i] is the price of a stock on day i.
You may complete at most k buy-sell transactions (a buy followed by a sell).

Return the maximum profit you can make.

Constraints
You cannot engage in multiple transactions at the same time.
You must sell before buying again.
If prices.length === 0 or k === 0, return 0.

 Why is k >= n / 2 a special case?
Each transaction consists of one buy and one sell, and you can’t buy again before selling.

So in n days:

You can make at most ⌊n/2⌋ transactions.
Example: in 6 days, the most you can do is 3 transactions → buy on 0,2,4 and sell on 1,3,5.
That's because it takes at least 2 days per transaction (1 for buying, 1 for selling).

dp[t][d - 1]= we skip day d (no sell)
prices[d] + maxDiff= we sell on day d
We must have bought on or before day d-1, and this is captured by maxDiff
maxDiff holds the best profit if we had bought earlier: dp[t - 1][j] - prices[j]
So maxDiff reflects the best situation where we:

Completed t-1 transactions before day j
Then bought at price prices[j]
That lets us compute dp[t][d] in constant time per day

*/

function maxProfit(k, prices) {
    const n = prices.length;
    if (n === 0 || k === 0) return 0;

    // Optimization: if k >= n/2, it's the unlimited transaction case
    //we can buy a maximum of n/2 for the rule to hold, if k>=n/2, we can buy and sell anytime
    if (k >= n / 2) {
        let profit = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }

    const dp = Array.from({ length: k + 1 }, () => Array(n).fill(0));

    for (let t = 1; t <= k; t++) {
        let maxDiff = -prices[0];
        for (let d = 1; d < n; d++) {
            dp[t][d] = Math.max(dp[t][d - 1], prices[d] + maxDiff);
            maxDiff = Math.max(maxDiff, dp[t - 1][d] - prices[d]);
        }
    }

    return dp[k][n - 1];
}
