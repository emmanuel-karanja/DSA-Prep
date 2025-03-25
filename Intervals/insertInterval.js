/**Given a list of non-overlapping, sorted intervals, and a new interval, 
 * insert it into the list and merge any overlaps. 
 * 
 * LOGIC:
 * 
 * 1. Before Overlap: Push intervals that end before newInterval starts.
   2. Merge Overlapping: If intervals overlap with newInterval, merge them.
   3. After Overlap: Push the rest of the intervals as-is.
 * 
 * */

function insertInterval(intervals, newInterval) {
    const result = [];
    let i = 0;
    const n = intervals.length;

    // Add all intervals before the new interval (no overlap)
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // Merge all overlapping intervals
    // overlap formulae Math.max(a1, b1) <= Math.min(a2, b2)
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }

    // Push the merged interval
    result.push(newInterval);

    // Add the rest
    while (i < n) {
        result.push(intervals[i]);
        i++;
    }

    return result;
}

const interval=[[1,2],[3,5],[6,7],[8,10],[12,16]]
const newInterval=[4,8]