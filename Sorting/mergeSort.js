/**
 * LOGIC:
 * 1. Base Case: If the array has 0 or 1 element, return it (already sorted).
   2. Divide: Split the array into two halves.
   3. Conquer: Recursively sort each half.
   4. Merge: Combine the two sorted halves into a single sorted array.
   
   Time O(nlogn) and Space O(n)*/

   function mergeSort(arr) {
    if (arr.length <= 1) return arr; // Base case

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let sortedArr = [], i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            sortedArr.push(left[i++]);
        } else {
            sortedArr.push(right[j++]);
        }
    }

    return sortedArr.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage:
console.log(mergeSort([8, 3, 5, 2, 7, 6, 4, 1]));
