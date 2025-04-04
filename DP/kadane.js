/*Kadane’s Algorithm - Maximum Subarray Sum
Problem Statement
Given an array of integers, find the contiguous subarray with the largest sum.

DECISION: Should we extend the previous subarray or start a new subarray from nums[i]?
Which is  currentSum=max(nums[i],currentSum+nums[i])

Time O(N) and Space O(1)*/

function maxSubArray(nums) {
    let currentSum = nums[0];
    let maxSoFar = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum+nums[i]);
        //update max
        maxSoFar = Math.max(maxSoFar, currentSum);
    }

    return maxSoFar;
}



function maxSubarrayWithIndices(nums) {
    let maxEndingHere = nums[0], maxSoFar = nums[0];
    let start = 0, end = 0, tempStart = 0;

    for (let i = 1; i < nums.length; i++) {
        let localSum=maxEndingHere+nums[i];
        if (nums[i] > localSum) {
            maxEndingHere = nums[i];
            tempStart = i; // Start new subarray, we could be starting here
        } else {
            maxEndingHere = localSum; // Extend subarray
        }

        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            start = tempStart;
            end = i;
        }
    }

    return { maxSum: maxSoFar, subarray: nums.slice(start, end + 1) };
}

// Example Usage
console.log(maxSubarrayWithIndices([-2,1,-3,4,-1,2,1,-5,4]));
console.log("newTest:",maxSubArray([1,2,-1,3]))
// Output: { maxSum: 6, subarray: [4, -1, 2, 1] }


