/**You are given an array of values where each value denotes an elevation of a bar. If said bars were in an enclosed
 * container, how many units of water would be collected after rain?
 * 
 * LOGIC:
 * 
 * 1. The bars can only trap water if they are 3 or more.
 * 2. Water collected at a given bar  is bound by the min of the maximum left and right bars.
 * 3. At any given bar i, the water collected is minBar-bars[i]
 * 4. At a given bar, we either update leftMax or rightMax or collect water.
 */

function waterAfterRain(bars = []) {
    if (bars.length < 3) return 0; // We must have at least 3 bars to collect water.

    let left = 0, right = bars.length - 1;
    let leftMax = bars[left];  // Initialize correctly
    let rightMax = bars[right]; // Initialize correctly
    let waterCollected = 0;

    while (left < right) {
        if (leftMax < rightMax) {
            left++; // Move left pointer first
            if (bars[left] < leftMax) {
                waterCollected += leftMax - bars[left]; // Collect water
            } else {
                leftMax = bars[left]; // Update leftMax
            }
        } else {
            right--; // Move right pointer first
            if (bars[right] < rightMax) {
                waterCollected += rightMax - bars[right]; // Collect water
            } else {
                rightMax = bars[right]; // Update rightMax
            }
        }
    }
    return waterCollected;
}

const testBars=[0,1,0,2,1,0,1,3,2,1,2,1];

console.log(waterAfterRain(testBars));