/**This is called the Dutch National Flag Problem
 * Given an array of n elements containing only 0s, 1s, and 2s, sort the array in-place in O(n) time 
 * and O(1) space. You CANNOT use sort() (must be done in one pass).
 * 
 * LOGIC:
 * 
 * Since there are only three numbers (0,1,2), we can use three pointers:

1. low → Marks the position where 0 should be placed.
2. mid → Current element being processed.
3. high → Marks the position where 2 should be placed.

4. Initialize Pointers:
     low = 0, mid = 0, high = arr.length - 1
5. Process Until mid <= high
     - If arr[mid] == 0: Swap arr[mid] and arr[low], move low++ and mid++
     - If arr[mid] == 1: Move mid++
     - If arr[mid] == 2: Swap arr[mid] and arr[high], move high--

*Each pointer represents a color

 *  */

function sortColors(nums) {
    let low = 0, mid = 0, high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            // Swap 0 to the left
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            // Keep 1s in the middle, advance 
            mid++;
        } else { //arr[mid]===2
            // Swap 2 to the right, we don't advance mid
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
}

// Example Usage
let arr = [2, 0, 2, 1, 1, 0];
sortColors(arr);
console.log(arr); // Output: [0, 0, 1, 1, 2, 2]
