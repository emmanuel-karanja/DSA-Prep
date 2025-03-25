/**I had the pairwise merge algorithm which is pretty good. But I hear there is the MinHeap version
 * 
 */

function mergeKSortedArrays(arrays) {
    const result = [];
    const heap = new MinHeap();

    // Initialize heap with the first element of each array
    for (let i = 0; i < arrays.length; i++) {
        if (arrays[i].length > 0) {
            heap.insert({
                val: arrays[i][0],
                arrIdx: i,
                elemIdx: 0
            });
        }
    }

    // Extract min and insert next element from that array
    while (heap.size() > 0) {
        const smallest = heap.extractMin(); // { val, arrIdx, elemIdx }
        result.push(smallest.val);

        const nextIdx = smallest.elemIdx + 1;
        const array = arrays[smallest.arrIdx];
        if (nextIdx < array.length) {
            heap.insert({
                val: array[nextIdx],
                arrIdx: smallest.arrIdx,
                elemIdx: nextIdx
            });
        }
    }

    return result;
}


/**Divide and Conquer, is still O(nlogk) */

function mergeKSortedArrays(arrays) {
    if (!arrays.length) return [];

    function mergeTwo(arr1, arr2) {
        let i = 0, j = 0;
        const result = [];

        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] < arr2[j]) {
                result.push(arr1[i++]);
            } else {
                result.push(arr2[j++]);
            }
        }
        return result.concat(arr1.slice(i)).concat(arr2.slice(j));
    }

    function mergeHelper(start, end) {
        if (start === end) return arrays[start];

        const mid = Math.floor((start + end) / 2);
        const left = mergeHelper(start, mid);
        const right = mergeHelper(mid + 1, end);
        return mergeTwo(left, right);
    }

    return mergeHelper(0, arrays.length - 1);
}
