/**You are climbing a staircase. It takes n steps to reach the top. You can either take 1 step or 2 steps at a time. 
 * How many distinct ways can you reach the top? */

function climbStairsRecursive(n) {
    if (n <= 2) return n;
    return climbStairs(n - 1) + climbStairs(n - 2);
}

function climbStairsDP(n) {
    if (n <= 2) return n;
    const dp = new Array(n + 1);
    dp[0] = 1;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

function climbStairsOptimal(n) {
    if (n <= 2) return n;
    
    let first = 1, second = 2;
    for (let i = 3; i <= n; i++) {
        let next = first + second;
        first = second;
        second = next;
    }
    return second;
}
