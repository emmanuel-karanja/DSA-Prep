
/**Given an array of meeting intervals where each interval is [start, end], determine 
 * if a person can attend all meetings without overlap.
 * 
 * LOGIC
 * 1. Sort the intervals by start time.
   2. Check for overlap: If meetings[i][0] < meetings[i - 1][1], return false. i.e. the start time for the current meeting is 
      less than(earlier) than the end time of the previous meeting
   3. If no overlaps exist, return true.

   Time O(nlogn) due to sorting
 */
function canAttendMeetings(intervals) {
    intervals.sort((a, b) => a[0] - b[0]); // Sort by start time

    for (let i = 1; i < intervals.length; i++) {
        //interval formulae Max(a1,b1) <= Min(a2,b2)
        if (intervals[i][0] < intervals[i - 1][1]) {
            return false; // Overlap found
        }
    }
    return true;
}

// Example usage:
console.log(canAttendMeetings([[0, 30], [5, 10], [15, 20]])); // false
console.log(canAttendMeetings([[7, 10], [2, 4]])); // true
