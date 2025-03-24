/**
 * Given an array of distinct positive integers candidates and a target integer target,
 * return all unique combinations of candidates where the chosen numbers sum to target.
 * You can reuse the same number multiple times.
 */

function combinationSum(arr = [], target) {
    const result = [];

    function backtrack(start, candidate, remainingTarget) {
        if (remainingTarget === 0) {
            result.push([...candidate]);
            return;
        }

        if (remainingTarget < 0) return;

        for (let i = start; i < arr.length; i++) {
            candidate.push(arr[i]);                          // choose
            backtrack(i, candidate, remainingTarget - arr[i]); // explore
            candidate.pop();                                 // un-choose (backtrack)
        }
    }

    backtrack(0, [], target);
    return result;
}
