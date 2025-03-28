/**Problem Statement:
Given a rotated sorted array of unique elements, find the minimum element.

LOGIC:

Since the array is rotated, the smallest element is the pivot point where rotation happens.

1. If the array is not rotated (e.g., [1,2,3,4,5]), the first element is the minimum.
2. Otherwise, binary search helps us find the pivot:
3.Check nums[mid]:
  - If nums[mid] > nums[right], the pivot is in the right half.
  - If nums[mid] < nums[right], the pivot is in the left half.
- - Narrow down until left == right, which gives the minimum.

Time O(logN)
*/

function findMin(nums) {
    let left = 0, right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        // The minimum must be in the unsorted part
        if (nums[mid] > nums[right]) {
            left = mid + 1; // Go right
        } else {
            right = mid; // Go left (including mid)
        }
    }

    return nums[left]; // Left and right converge to the minimum
}

const arr=[4,5,6,7,0,1,2]

console.log(findMin(arr))