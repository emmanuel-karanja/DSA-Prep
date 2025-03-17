/**You're given a list of schedules for multiple employees. Each employee's schedule is represented 
 * as a list of non-overlapping intervals when they are busy. The goal is to find the common free time
 *  slots available to all employees.
 * 
 * LOGIC:
 * 
 * 1. Flatten all schedules into a single list of busy intervals.
   2. Sort intervals by start time.
   3. Merge overlapping intervals to get a consolidated list of busy times.
   4. Find gaps between merged busy intervals – these are the common free times.
 *  */

function employeeFreeTime(schedules) {
    let intervals = [];
    
    // Flatten the input: Extract all busy intervals into one list
    for (let schedule of schedules) {
        intervals.push(...schedule);
    }
    
    // Step 1: Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    let merged = [];
    let prev = intervals[0];

    // Step 2: Merge overlapping intervals
    for (let i = 1; i < intervals.length; i++) {
        let curr = intervals[i];

        if (curr[0] <= prev[1]) {
            // Overlapping interval, merge it
            prev[1] = Math.max(prev[1], curr[1]);
        } else {
            // Non-overlapping interval, push previous and update
            merged.push(prev);
            prev = curr;
        }
    }
    merged.push(prev);

    // Step 3: Find gaps (free time slots)
    let freeTimes = [];
    for (let i = 1; i < merged.length; i++) {
        freeTimes.push([merged[i - 1][1], merged[i][0]]);
    }

    return freeTimes;
}

// Example Usage
let schedules = [
    [[1, 3], [6, 7]],
    [[2, 4]],
    [[2, 5], [9, 12]]
];
console.log(employeeFreeTime(schedules)); // [[5, 6], [7, 9]]
