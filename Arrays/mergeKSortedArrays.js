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

function mergeKArrays(arrays) {
    if (!arrays || arrays.length === 0) return [];

    return mergeRange(arrays, 0, arrays.length - 1);
}

function mergeRange(arrays, left, right) {
    if (left === right) return arrays[left]; // base case

    const mid = Math.floor((left + right) / 2);
    const leftMerged = mergeRange(arrays, left, mid);
    const rightMerged = mergeRange(arrays, mid + 1, right);

    return mergeTwoArrays(leftMerged, rightMerged);
}

function mergeTwoArrays(a, b) {
    const result = [];
    let i = 0, j = 0;

    while (i < a.length && j < b.length) {
        if (a[i] < b[j]) {
            result.push(a[i++]);
        } else {
            result.push(b[j++]);
        }
    }

    while (i < a.length) result.push(a[i++]);
    while (j < b.length) result.push(b[j++]);

    return result;
}
