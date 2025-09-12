/*#*/
/**
 * Problem Definition:
 * -------------------
 * Given an array of integers `hand` representing cards and an integer `W` representing group size,
 * determine if the cards can be rearranged into groups of `W` consecutive cards.
 * Each card can only be used once. Return true if possible, else false.
 *
 * Example:
 *   hand = [1,2,3,6,2,3,4,7,8], W = 3
 *   Possible grouping: [1,2,3], [2,3,4], [6,7,8] -> returns true.
 *
 * Intuition:
 * ----------
 * Sort the unique card values. For each smallest card still available, attempt to build a group of W
 * consecutive cards using it as the start. Reduce their frequencies accordingly.
 * If at any point we don't have enough cards to form a group, return false.
 *
 * Logic:
 * ------
 * 1. If the total number of cards is not divisible by W, it's impossible — return false.
 * 2. Count the frequency of each card using a map.
 * 3. Sort the unique card values ascending.
 * 4. For each card value `k`:
 *    - Let `freq` = how many of card `k` remain.
 *    - If `freq > 0`, try to form `freq` groups starting at `k`:
 *      a. For i in [0..W-1], check if `count[k+i]` >= freq.
 *      b. If any count is too small, return false.
 *      c. Otherwise, subtract `freq` from `count[k+i]`.
 * 5. If all groups are formed successfully, return true.
 */

function isNStraightHand(hand, W) {
    if (hand.length % W !== 0) return false; // must be divisible to form equal groups
    const count = new Map();
    for (const h of hand) count.set(h, (count.get(h) || 0) + 1);
    const keys = [...count.keys()].sort((a, b) => a - b);

    for (const k of keys) {
        const freq = count.get(k);
        if (freq > 0) {
            // Try forming freq groups starting from k
            for (let i = 0; i < W; i++) {
                if ((count.get(k + i) || 0) < freq) return false;
                count.set(k + i, count.get(k + i) - freq);
            }
        }
    }
    return true;
}

// -------- Driver Code --------
function main() {
    const hand = [1,2,3,6,2,3,4,7,8];
    const W = 3;
    const result = isNStraightHand(hand, W);
    console.log(`Hand: [${hand.join(', ')}], W = ${W}`);
    console.log(`Can be rearranged: ${result}`); // Expected: true
}

main();
