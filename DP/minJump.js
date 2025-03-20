/**The goal of this problem is to reach the last index in the fewest number of jumps. Given an array arr, 
 * where arr[i] represents the maximum number of steps we can jump forward from index i,
 *  we need to find the minimum jumps required.
 * 
 * LOGIC:
 *1.  Greedy choice is optimal
      Instead of exploring all possible jump paths (which would be brute force and inefficient), 
      we always try to reach as far as possible with the fewest jumps.

  2. Tracking the maxReach
     We maintain maxReach, which tells us the farthest index we can currently reach.

  3. Tracking steps remaining in a jump
    Instead of making a decision at every index, we commit to a jump and track how many steps are left before we must 
     make another jump.
 *  */

function minJumps(arr) {
    let n = arr.length;
    if (n <= 1) return 0; // Already at the end
    if (arr[0] == 0) return -1; // Cannot move forward

    let maxReach = arr[0]; // Farthest we can reach
    let steps = arr[0]; // Steps we can take before next jump
    let jumps = 1; // Number of jumps

    for (let i = 1; i < n; i++) {
        if (i == n - 1) return jumps; // Reached the last index

        maxReach = Math.max(maxReach, i + arr[i]); // Extend max reach
        steps--; // Use a step

        if (steps == 0) { // Need a jump
            jumps++;
            if (i >= maxReach) return -1; // If we can't go further, return -1
            steps = maxReach - i; // Reset steps for the next jump
        }
    }

    return -1;
}

// 🔥 Example Usage
console.log(minJumps([2, 3, 1, 1, 4])); // Output: 2 (2 → 3 → 4)
console.log(minJumps([1, 1, 1, 1]));    // Output: 3 (1 → 1 → 1 → end)
console.log(minJumps([0, 2, 3]));       // Output: -1 (Stuck at index 0)
