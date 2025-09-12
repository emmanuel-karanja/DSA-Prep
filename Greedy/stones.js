/*#*/
/**
 * Problem Definition:
 * -------------------
 * Given an array of positive integers `stones`, each value represents the weight of a stone.
 * Each turn, you pick the two heaviest stones (x <= y), smash them together:
 *  - If x === y, both are destroyed.
 *  - If x !== y, the smaller one is destroyed, and the larger one is reduced by x (new weight = y - x),
 *    then put the new stone back into the pile.
 * Repeat until at most one stone remains. Return the weight of the remaining stone, or 0 if none remain.
 *
 * Intuition:
 * ----------
 * To simulate the smashing process, we need quick access to the two heaviest stones each time.
 * Sorting the array descendingly allows us to take the largest stones from the front.
 * After smashing, the resulting stone (if any) must be reinserted into the sorted array to keep the
 * heaviest stones at the front for the next iteration.
 *
 * Logic:
 * ------
 * 1. Sort stones in descending order.
 * 2. While more than one stone remains:
 *    a. Remove the two largest stones (front of the array).
 *    b. If their weights differ, compute their difference.
 *    c. Insert this new stone back into the array at the correct position to keep it sorted.
 * 3. If one stone remains, return its weight; otherwise, return 0.
 */
function lastStoneWeight(stones) {
    stones.sort((a,b)=>b-a);
    while (stones.length > 1) {
        const y = stones.shift(), x = stones.shift();
        if (y !== x) {
            const diff = y - x;
            let idx = stones.findIndex(s => s < diff);
            if (idx === -1) stones.push(diff);
            else stones.splice(idx, 0, diff);
        }
    }
    return stones.length ? stones[0] : 0;
}

// Top comment explains the algorithm above (optional)

// Example driver code
function main() {
  const testCases = [
    [2,7,4,1,8,1],  // Example: Expected output = 1
    [1],            // Only one stone: Expected output = 1
    [3,3],          // Two equal stones: Expected output = 0
    [9,3,2,10],     // Mixed weights: Expected output = 0
    [5,5,6,7],      // Expected output = 1
  ];

  testCases.forEach((stones, idx) => {
    const result = lastStoneWeight([...stones]); // copy array to avoid mutation
    console.log(`Test Case ${idx + 1}: Stones = [${stones.join(', ')}] -> Remaining Weight = ${result}`);
  });
}

main();
