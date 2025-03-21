/**[HARD]
 * Given two sorted arrays nums1 and nums2 of sizes m and n, find the median of the two sorted arrays.
 *  The overall time complexity must be O(log (m+n)).
 * 
 * LOGIC
 * 
 * 1. Find the combined length of the two arrays and find the middle i.e. (m+n)/2=mid
 * 2. Look at at the smaller array and find partition at the middle e.g. m/2=smallerMid
 * 3. The partition on the larger array will be mid-smallerMid= biggerMid this tells us the size of larger array to pick.
 * 4. Test the correctness of the partition i,e.
 *       - the last element in the larger partition is greater or equal to the element to the right of the rightmost element in the smaller array partition AND
 *        -the last element in the smaller array partition is greater or equal to the element to the right of the rightmost element in the larger array partition
 *    
 *     *If not for any of them, move the left pointer of that array to the element to the right of the smaller or largerMid and find the floor  of (left+right)/2
 *      consider the partition from 0 to newMid
 *     recalculate the partition of the other aray and test the correctness of the partition
 * 
 * *We always end up running Binary Search on the smaller array
 * 
 *  */

function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1); // Ensure nums1 is smaller
    }

    let x = nums1.length, y = nums2.length;
    let low = 0, high = x;

    while (low <= high) {
        let partitionX = Math.floor((low + high) / 2);
        let partitionY = Math.floor((x + y + 1) / 2) - partitionX;

        // Edge cases (use -Infinity and +Infinity)
        let maxLeftX = (partitionX === 0) ? -Infinity : nums1[partitionX - 1];
        let minRightX = (partitionX === x) ? Infinity : nums1[partitionX];

        let maxLeftY = (partitionY === 0) ? -Infinity : nums2[partitionY - 1];
        let minRightY = (partitionY === y) ? Infinity : nums2[partitionY];

        // Correct partition found
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((x + y) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2.0;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            high = partitionX - 1; // Move left
        } else {
            low = partitionX + 1; // Move right
        }
    }
    
    throw new Error("Input arrays are not sorted.");
}

// Example Cases
console.log(findMedianSortedArrays([1, 3], [2])); // Output: 2.0
console.log(findMedianSortedArrays([1, 2], [3, 4])); // Output: 2.5
