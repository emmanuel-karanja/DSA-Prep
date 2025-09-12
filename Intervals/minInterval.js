/*#*/
/**
 * Problem Definition:
 * -------------------
 * Given an array of intervals `intervals` where intervals[i] = [start, end] and 
 * an array of query points `queries`, return an array `res` where `res[j]` is the 
 * length of the smallest interval that contains `queries[j]`. If no such interval 
 * exists for a query, return -1 for that position.
 *
 * Intuition:
 * ----------
 * To efficiently answer queries, sort both intervals and queries by their start points/values. 
 * As you process each query in ascending order, add to a "min-heap" all intervals whose 
 * start <= current query. Remove intervals from the heap that end < current query (they 
 * no longer contain it). The heap’s top element gives the smallest interval containing 
 * the query.
 *
 * Logic:
 * ------
 * 1. Sort intervals by start time ascending.
 * 2. Pair queries with their original indices, then sort queries ascending by value.
 * 3. Initialize an empty heap (here simulated with an array and manual sort for simplicity) 
 *    and a result array filled with -1.
 * 4. For each query:
 *    a. Add all intervals starting <= query to the heap, storing [intervalLength, end].
 *    b. Sort the heap to keep the smallest intervalLength at the front.
 *    c. Remove intervals whose end < query (they don't cover the query).
 *    d. If the heap is not empty, the front element’s length is the answer for this query.
 * 5. Return the result array in the original query order.
 */

function minInterval(intervals, queries) {
    intervals.sort((a, b) => a[0] - b[0]);
    const sortedQueries = queries.map((q, i) => [q, i]).sort((a, b) => a[0] - b[0]);
    const res = Array(queries.length).fill(-1);
    const heap = new MinHeap();
    let i = 0;

    for (const [q, idx] of sortedQueries) {
        // Add intervals that start before or at the current query
        while (i < intervals.length && intervals[i][0] <= q) {
            const [start, end] = intervals[i];
            heap.push([end - start + 1, end]); // store [length, end]
            i++;
        }

        // Maintain heap property by sorting by interval length
        heap.sort((a, b) => a[0] - b[0]);

        // Remove intervals that end before the current query
        while (heap.length && heap[0][1] < q) heap.shift();

        // If any interval covers the query, pick the smallest length
        if (heap.length) res[idx] = heap[0][0];
    }
    return res;
}

// -------- Driver Code --------
function main() {
    const intervals = [[1,4],[2,4],[3,6],[4,4]];
    const queries = [2,3,4,5];
    const result = minInterval(intervals, queries);
    console.log(`Intervals: ${JSON.stringify(intervals)}`);
    console.log(`Queries: ${queries}`);
    console.log(`Result: ${result}`); // Expected: [3,3,1,4]
}

main();
