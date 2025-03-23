/**You are given an array people[] where people[i] is the weight of the i-th person.
 *  Each boat can carry at most two people at a time, with a maximum weight limit of limit.
Find the minimum number of boats required to save all the people.

LOGIC:

1. Sort the people by weights.
2. Match the heaviest with the lightest to get the minimum number of boats This means using two pointers.
3. The heaviest person always gets a boat.


*/

function numRescueBoats(people, limit) {
    people.sort((a, b) => a - b);  // Step 1: Sort the array
    let left = 0, right = people.length - 1;
    let boats = 0;

    while (left <= right) {
        if (people[left] + people[right] <= limit) {
            left++;  // Pairing lightest and heaviest person
        }
        right--;  // Heaviest always gets a boat
        boats++;  // Every iteration means one boat is used
    }
    return boats;
}

// Example usage
console.log(numRescueBoats([3, 2, 2, 1], 3)); // Output: 3
