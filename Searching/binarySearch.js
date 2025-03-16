function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;

    while (low <= high) {
        //note that the mid is always computed within the loop
        let mid = Math.floor((low + high) / 2);

        if (arr[mid] === target) return mid; // Found
        if (arr[mid] < target) low = mid + 1; // Search right half
        else high = mid - 1; // Search left half
    }

    return -1; // Not found
}

// Example Usage
console.log(binarySearch([1, 3, 5, 7, 9, 11, 13], 7)); // Output: 3
