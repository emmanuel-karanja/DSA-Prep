/**Given an array of meeting intervals, 
 * find the minimum number of conference rooms required to schedule all meetings.
 * 
 * LOGIC:
 * 
 * 1. Extract all start times and end times into separate arrays.
   2. Sort both arrays.
   3. Use a two-pointer technique:
        - When a meeting starts → Increase room count.
        - When a meeting ends → Free a room (decrease count).
   4. Keep track of the maximum rooms needed

   Time O(nlogn) due to the sorting
 *  */

   function minMeetingRooms(intervals) {
    if (intervals.length === 0) return 0;

    //Notice the elegant way to extract the startTimes and endTimes
    let startTimes = intervals.map(i => i[0]).sort((a, b) => a - b);
    let endTimes = intervals.map(i => i[1]).sort((a, b) => a - b);

    let rooms = 0, maxRooms = 0;
    let i = 0, j = 0;

    while (i < startTimes.length) {
        if (startTimes[i] < endTimes[j]) {
            rooms++;  // A new meeting starts → Need a new room
            maxRooms = Math.max(maxRooms, rooms);
            i++;
        } else {
            rooms--;  // A meeting ended → Free a room
            j++;
        }
    }
    return maxRooms;
}

// Example usage:
console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]])); // 2
console.log(minMeetingRooms([[7, 10], [2, 4]])); // 1
