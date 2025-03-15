/**Given an array nums of integers and an integer target, return indices of the two numbers
 * such that they add up to target.

Each input has exactly one solution, and you cannot use the same element twice.
Return the indices in any order. 

LOGIC:

1.Use a hash map (object) to store numbers seen so far and their indices.
2. For each number, check if (target - num) exists in the map.
3. If found, return the indices immediately.


Time O(n) and space O(1)
*/
function twoSum(nums, target) {
    let map = {};  // Stores num -> index

    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];

        if (complement in map) {
            return [map[complement], i];
        }

      // add this to the map
        map[nums[i]] = i;
    }
    return [];
}
