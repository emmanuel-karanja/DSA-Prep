/**A rotated array is an array that has been shifted (rotated) some number of times 
 * to the right or left from a sorted state. 
 * 
 * Given a rotated sorted array and a target value, return its index. If not found, return -1.
 * 
 * LOGIC: Modified Binary Search
 * 
 * 1.Find the midpoint of the array.
 * 2. Check if that's the target.
 * 3. Determine which half is sorted and search it.
 *      i.e. if nums[left] <= nums[mid] left is sorted else right is sorted
 *   *What we are really doing is determining which half to search i.e. does the target lie within 
 *    that space i.e. nums[left] and nums[mid], if not, we search the other half, starting from
 *    mid+1 to right, and so on.
 * 4. Do the binary search on the sorted half.
 * 
 * >>The only special thing here is finding the sorted half and then do a binary search on it.
 * */

function searchRotatedArray(nums, target) {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return mid;

        // Check which half is sorted
        if (nums[left] <= nums[mid]) { // Left half sorted
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // Search left
            } else {
                left = mid + 1; // Search right
            }
        } else { // Right half sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1; // Search right
            } else {
                right = mid - 1; // Search left
            }
        }
    }

    return -1; // Not found
}

const arr=[4,5,6,7,0,1,2] 

console.log(searchRotatedArray(arr,5))