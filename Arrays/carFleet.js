/*#*/
/**
 * Problem Statement:
 * -----------------
 * There are n cars going to the same destination along a one-lane road. The destination is at position 'target'.
 * You are given two arrays: 'position' and 'speed', where position[i] is the position of the i-th car and speed[i] is its speed.
 * 
 * A car fleet is a group of cars traveling at the same speed, where a faster car catches up to a slower car and they move together.
 * Return the number of car fleets that will arrive at the destination.
 * 
 * Example:
 * ----------
 * Input: target = 12, position = [10, 8, 0, 5, 3], speed = [2, 4, 1, 1, 3]
 * Output: 3
 * 
 * Explanation:
 * - Car at 10 and speed 2 -> reaches in 1 hour
 * - Car at 8 and speed 4 -> reaches in 1 hour
 *   These two meet at destination forming a fleet.
 * - Car at 0 and speed 1 -> reaches in 12 hours
 * - Car at 5 and speed 1 -> reaches in 7 hours
 * - Car at 3 and speed 3 -> reaches in 3 hours
 *   Cars at 5 and 3 form a fleet eventually with the slower car at 0 remaining separate.
 * 
 * Intuition:
 * ----------
 * 1. Sort cars by starting position from closest to the destination to farthest.
 * 2. Iterate over cars:
 *    - Calculate the time each car takes to reach the target.
 *    - If a car's time is greater than the current fleet's time, it forms a new fleet.
 *    - Otherwise, it joins the fleet ahead.
 * 3. Count the number of fleets.
 */

function carFleet(target, position, speed) {
    // Combine positions and speeds, sort descending by position
    const cars = position.map((p, i) => [p, speed[i]])
                         .sort((a, b) => b[0] - a[0]);
    
    let fleets = 0;     // Number of fleets
    let curTime = 0;    // Time of the last fleet to reach the target

    for (const [pos, spd] of cars) {
        const time = (target - pos) / spd;  // Time to reach target
        // If this car takes longer than the last fleet, it forms a new fleet
        if (time > curTime) {
            fleets++;
            curTime = time;
        }
    }

    return fleets;
}

// Driver code to test the function
const testCases = [
    { target: 12, position: [10, 8, 0, 5, 3], speed: [2, 4, 1, 1, 3], expected: 3 },
    { target: 10, position: [3], speed: [3], expected: 1 },
    { target: 100, position: [0, 2, 4], speed: [4, 2, 1], expected: 1 }
];

testCases.forEach(({target, position, speed, expected}, i) => {
    const result = carFleet(target, position, speed);
    console.log(`Test Case ${i + 1}: Expected = ${expected}, Got = ${result}`);
});
