/**Given an unsorted array of integers nums,

return the length of the longest consecutive elements sequence.

You must solve it in O(n) time.

LOGIC

Only start building sequences from numbers that do not have a previous number in the set 
(i.e., num - 1 is not in the set). This ensures you only build once per sequence.

1. Put the numbers in a set, that takes care of the duplicates.
2. Start only if num-1 is not present to ensure that the current number is the beginning of a streak
   basically, expanding forward from the current number and you do this for all numbers in the set.
3. Keep track of the current streak 
4. Globally keep track of the longest streak


*/

function longestConsecutive(nums) {
    const numSet = new Set(nums);
    let longest = 0;

    for (const num of numSet) {
        // Only start if num is the beginning of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;
            // does the next number in the sequence exist?
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            longest = Math.max(longest, currentStreak);
        }
    }

    return longest;
}


function longestConsecutiveArray(nums) {
    const numSet = new Set(nums);
    let longest = 0;
    let result = [];

    for (const num of numSet) {
        // only start from numbers that are the beginning of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;
            let currentSeq = [currentNum]; // start with num

            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
                currentSeq.push(currentNum); //only push after confirming it exists
            }

            if (currentStreak > longest) {
                longest = currentStreak;
                result = currentSeq;
            }
        }
    }

    return [longest, result];
}


const nums= [100, 4, 200, 1, 3, 2]
console.log(longestConsecutiveArray(nums))