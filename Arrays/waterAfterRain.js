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

function waterAfterRain(height = []) {
    if (height.length === 0) return 0;

    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let totalWater = 0;

    while (left < right) {
        //compare height[left] and height[right]
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += rightMax - height[right];
            }
            right--;
        }
    }

    return totalWater;
}

const testBars=[0,1,0,2,1,0,1,3,2,1,2,1];

console.log(waterAfterRain(testBars));