/**Given a rotated array, find out how many times it has been rotated:
 * 
 * LOGIC:
 * 1. Find the smallest element and find out how far it's from the index 0. i.e. the index of the minumum element.
 * 
 */
/**O(n) */
function findRotationCount(arr) {
    let min = arr[0];
    let index = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            index = i;
        }
    }

    return index;
}

/**O(log n) */
function findRotationCountOptimal(nums) {
    let left = 0, right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        // If mid is greater than right, the rotation is in the right half
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid; // Pivot is in the left half (including mid)
        }
    }

    return left; // Left (or right) is the index of the minimum element which is equal to the number of rotations
}

const arr=[4,5,6,7,0,1,2]

console.log("first",findRotationCount(arr))
console.log("optimal",findRotationCountOptimal(arr))
