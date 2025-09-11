/**
 * Car Fleet Problem
 *
 * Problem Statement:
 * You are given a target position, an array of starting positions, and an array of speeds of cars moving towards the target.
 * A car fleet is a group of cars traveling at the same speed, where faster cars catch up with slower cars ahead to form a fleet.
 * Return the number of car fleets that will arrive at the destination.
 *
 * Logic:
 * 1. Compute the time each car takes to reach the target.
 * 2. Sort cars by starting position in descending order (closest to target first).
 * 3. Traverse sorted cars:
 *    - If current car's time > time of previous fleet → new fleet is formed.
 *    - Else → car joins the fleet ahead.
 * 4. Count total fleets.
 *
 * Time Complexity: O(n log n) due to sorting
 * Space Complexity: O(n) for storing times and positions
 */

function carFleet(target, position, speed) {
    const n = position.length;
    // Create array of cars with position and time to reach target
    const cars = position.map((pos, i) => ({
        pos: pos,
        time: (target - pos) / speed[i]
    }));

    // Sort cars by position descending (closest to target first)
    cars.sort((a, b) => b.pos - a.pos);

    let fleets = 0;
    let lastTime = 0;

    for (let car of cars) {
        // If car's time is greater than last fleet's time, forms a new fleet
        if (car.time > lastTime) {
            fleets++;
            lastTime = car.time;
        }
        // Else, car joins the fleet ahead (do nothing)
    }

    return fleets;
}

// Example usage
const target = 12;
const position = [10, 8, 0, 5, 3];
const speed = [2, 4, 1, 1, 3];
console.log(carFleet(target, position, speed)); // Output: 3
