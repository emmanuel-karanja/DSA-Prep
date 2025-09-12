/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive),
 * there is only **one repeated number**. Find this duplicate number **without modifying the array** and 
 * using constant extra space.
 * 
 * Example:
 * ----------
 * Input: [1,3,4,2,2]
 * Output: 2
 * 
 * Input: [3,1,3,4,2]
 * Output: 3
 * 
 * Constraints:
 * - Must use O(1) extra space.
 * - Must not modify the input array.
 * 
 * Intuition:
 * ----------
 * This problem can be solved using **Floyd’s Tortoise and Hare (Cycle Detection) algorithm**:
 * 1. Treat the array as a linked list where the value points to the next index.
 * 2. A duplicate number creates a cycle in this “linked list”.
 * 3. Use slow and fast pointers to detect the cycle.
 * 4. Once a cycle is detected, reset one pointer to the start and move both one step at a time.
 * 5. They meet at the duplicate number.
 */

function findDuplicate(nums) {
    let slow = nums[0], fast = nums[0];

    // Phase 1: Detect cycle using Floyd's Tortoise and Hare
    do {
        slow = nums[slow];         // Move slow pointer 1 step
        fast = nums[nums[fast]];   // Move fast pointer 2 steps
    } while (slow !== fast);

    // Phase 2: Find entrance to cycle (duplicate number)
    slow = nums[0]; // Reset slow to start
    while (slow !== fast) {
        slow = nums[slow]; // Move both pointers 1 step
        fast = nums[fast];
    }

    return slow; // Duplicate number
}

// Driver code to test the function
const testCases = [
    { nums: [1,3,4,2,2], expected: 2 },
    { nums: [3,1,3,4,2], expected: 3 },
    { nums: [1,1], expected: 1 },
    { nums: [1,1,2], expected: 1 }
];

testCases.forEach(({nums, expected}, i) => {
    const result = findDuplicate(nums);
    console.log(`Test Case ${i + 1}: Expected = ${expected}, Got = ${result}`);
});
