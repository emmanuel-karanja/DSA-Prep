/*#*/
/**
 * Problem Definition:
 * -------------------
 * Given an array `nums` where each element represents the maximum jump length at that position,
 * return the minimum number of jumps needed to reach the last index.
 * (LeetCode 45: Jump Game II)
 *
 * Example:
 *   nums = [2,3,1,1,4] 
 *   Minimum jumps to reach end = 2  (2 -> 3 -> 4)
 *
 * Intuition:
 * ----------
 * Greedily track the furthest position we can reach while scanning.
 * When we reach the end of the current "jump range", increment the jump count
 * and update the range to the furthest we can reach so far.
 *
 * Logic:
 * ------
 * 1. Initialize:
 *    - jumps = 0 (number of jumps taken)
 *    - curEnd = 0 (end of the current jump range)
 *    - curFarthest = 0 (farthest position reachable within the current range)
 * 2. Traverse `nums` up to the second-to-last element:
 *    - Update curFarthest = max(curFarthest, i + nums[i]).
 *    - If i == curEnd, we've reached the end of the current jump range:
 *        a. Increment jumps.
 *        b. Update curEnd = curFarthest (start a new jump range).
 * 3. Return jumps at the end.
 */

function jumps2(nums) {
    let jumps = 0, curEnd = 0, curFarthest = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        curFarthest = Math.max(curFarthest, i + nums[i]);
        if (i === curEnd) {
            jumps++;
            curEnd = curFarthest;
        }
    }
    return jumps;
}

// -------- Driver Code --------
function main() {
    const nums = [2,3,1,1,4];
    const result = jumps2(nums);
    console.log(`Array: [${nums.join(', ')}]`);
    console.log(`Minimum jumps to reach the end: ${result}`); // Expected: 2
}

main();
