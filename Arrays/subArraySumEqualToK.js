/**Given an array of integers nums and an integer k,

return the total number of continuous subarrays whose sum equals to k. */

function subarraySum(nums, k) {
    const prefixMap = new Map();
   

    let count = 0;
    let currentSum = 0;
    prefixMap.set(0, 1); // base case: sum 0 has occurred once, this is critical

    for (const num of nums) {
        currentSum += num;

        /**Check if the prefix sum exists in the map */
        if (prefixMap.has(currentSum - k)) {
            /*so the value is the number of occurrences of the prefix sum? yes */
            count += prefixMap.get(currentSum - k);
        }
        //else add the prefix sum and the occurences
        prefixMap.set(currentSum, (prefixMap.get(currentSum) || 0) + 1);
    }

    return count;
}


/**Twist to return the subarrays themselves i.e. start and end index
 * 
 * BUT IT'S A ROCK! ARGUMENT
 * if (prefixMap.has(sum - k))
It means:

"I found a previous prefix sum P such that the difference between my current sum and P is exactly k."

A prefix sum is the sum of elements from the beginning of the array up to a certain index.
 */

function findSubarrayIndicesWithSumK(nums, k) {
    const result = [];
    const prefixMap = new Map();
    prefixMap.set(0, [-1]); // sum of 0 exists at index -1 (before array starts)

    let currentSum = 0;

    for (let i = 0; i < nums.length; i++) {
        currentSum += nums[i];

        const target = currentSum - k;

        //We found a match, so, we will create a result and add it
        if (prefixMap.has(target)) { 
            for (const startIdx of prefixMap.get(target)) {
                //We store prefix sums upto an index so, we start at the next one i.e. startIdx+1
                result.push([startIdx + 1, i]); // subarray from (startIdx+1) to i
            }
        }

        if (!prefixMap.has(currentSum)) {
            prefixMap.set(currentSum, []);
        }
        prefixMap.get(currentSum).push(i); // store the sum upto this point and the index to this point
    }

    console.log(prefixMap)

    return result;
}

const nums = [1, 2, 3, -2, 5];
const k = 3;
const indices = findSubarrayIndicesWithSumK(nums, k);

console.log("Subarray indices with sum k:", indices);