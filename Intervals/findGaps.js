function findGaps(intervals) {
    // Step 1: Sort the intervals by their start time
    intervals.sort((a, b) => a[0] - b[0]);
  
    let gaps = [];
    
    // Step 2: Iterate through the sorted intervals and find gaps
    for (let i = 1; i < intervals.length; i++) {
      let prev = intervals[i - 1];
      let curr = intervals[i];
  
      // If there is a gap between the previous and current interval
      if (prev[1] < curr[0]) {
        gaps.push([prev[1], curr[0]]);
      }
    }
  
    return gaps;
  }
  
  // Example usage:
  const intervals = [[1, 5], [6, 10], [12, 15], [20, 25]];
  const gaps = findGaps(intervals);
  console.log(gaps); // Output: [[5, 6], [10, 12], [15, 20]]
  