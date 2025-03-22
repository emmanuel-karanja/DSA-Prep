/**PROBLEM: Find the median of two sorted arrays. Ensure the Time complexity is O(min(logn)).
 * 
 * LOGIC:
 * We can't merge, merging is O(m+n) and O(logn) signals an aspect of binary search
 * 
 * Strategy: Binary Search on the Smaller Array
We are going to:

Imagine cutting both arrays so the left half has half the total elements
Find the perfect partition such that:
1. All values in the left half are ≤ values in the right half
2. Use binary search to adjust the cut until we find that condition

We want:

L1 is the first arrays, left half and R1 is first arrays' right half.
L2 and R2 ditto (the second array)

max(L1, L2) <= min(R1, R2)
Then median is:

If odd: max(L1, L2)
If even: (max(L1, L2) + min(R1, R2)) / 2

LOGIC

Always do binary search on the smaller array for efficiency.
Partition both arrays such that:
Left side has ⌊(m + n + 1)/2⌋ elements total
Use binary search to find the right cut

We do: 
Math.floor((x + y + 1) / 2)
to guarantee the left half always has the correct number of elements,
especially when the total number of elements is odd.

*/

function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        // Ensure binary search is on smaller array
        return findMedianSortedArrays(nums2, nums1);
    }

    let x = nums1.length;
    let y = nums2.length;
    let low = 0, high = x; //note this carefully, we are using the smaller of the two arrays

    while (low <= high) {
        let partitionX = Math.floor((low + high) / 2);
        let partitionY = Math.floor((x + y + 1) / 2) - partitionX;

        // Handle edges
        let maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        let minRightX = partitionX === x ? Infinity : nums1[partitionX];

        let maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        let minRightY = partitionY === y ? Infinity : nums2[partitionY];

        // Found correct partition
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((x + y) % 2 === 0) { //is even case
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else { //is odd case
                return Math.max(maxLeftX, maxLeftY);
            }
        } //

        else if (maxLeftX > minRightY) { //if the partition of the smaller array is too far right we move high to ther
            // Move left in nums1
            high = partitionX - 1;
        } else { //it's too low i.e. minRghtY > maxLeftX
            // Move right in nums1
            low = partitionX + 1;
        }
    }

    throw new Error("Input arrays are not sorted correctly.");
}
