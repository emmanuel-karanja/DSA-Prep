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
