/**Given a list of unique integers nums, return all possible subsets (the power set). */

function subsets(nums) {
    const result = [];

    function backtrack(start, currentSubset) {
        // Add current subset to result
        result.push([...currentSubset]);

        // Try including each number starting from `start`
        for (let i = start; i < nums.length; i++) {
            currentSubset.push(nums[i]);           // choose
            backtrack(i + 1, currentSubset);       // explore
            currentSubset.pop();                   // un-choose (backtrack)
        }
    }

    backtrack(0, []);
    return result;
}
