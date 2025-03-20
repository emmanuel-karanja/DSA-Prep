/**You are given two arrays:

gas[i]: The amount of gas available at station i.
cost[i]: The amount of gas needed to travel from station i to station i+1 (circular route).
You start with an empty tank and can refuel at any station. The goal is to determine if there exists a starting 
gas station from which you can complete the full circuit once, without running out of fuel at any point. If possible, 
return the starting index; otherwise, return -1. 

Intuition
1. If the total gas available is less than the total cost, completing the circuit is impossible.
2. If the total gas is greater than or equal to the total cost, a solution exists.
3. We need to determine the correct starting station.

LOGIC
1. Calculate the net fuel for each station:
    net[i]=gas[i]−cost[i]
2. Track the total sum of net[i]. If it's negative, return -1 (no solution).
3. Iterate over the stations:
4. Keep a currentTank variable to track available fuel.
5. If currentTank becomes negative, reset it and assume the next station as the starting point.
The first valid station after a reset is the answer.

*/

function canCompleteCircuit(gas, cost) {
    let totalTank = 0, currentTank = 0, startIndex = 0;

    for (let i = 0; i < gas.length; i++) {
        let netFuel = gas[i] - cost[i];
        totalTank += netFuel;
        currentTank += netFuel;

        // If currentTank is negative, we can't start from this or any earlier station
        if (currentTank < 0) {
            startIndex = i + 1; // Try starting from the next station
            currentTank = 0; // Reset tank
        }
    }

    return totalTank >= 0 ? startIndex : -1;
}

// Example Usage
let gas = [1, 2, 3, 4, 5];
let cost = [3, 4, 5, 1, 2];

console.log(canCompleteCircuit(gas, cost)); // Output: 3

//Brute Force Time O(n^2)

function canCompleteCircuitBruteForce(gas, cost) {
    let n = gas.length;
    
    for (let start = 0; start < n; start++) {
        let fuel = 0, valid = true;

        for (let i = 0; i < n; i++) {
            let idx = (start + i) % n; // Circular traversal
            fuel += gas[idx] - cost[idx];

            if (fuel < 0) { // Ran out of fuel
                valid = false;
                break;
            }
        }
        
        if (valid) return start;
    }

    return -1;
}

// Example Usage
let gasBrute = [1, 2, 3, 4, 5];
let costBrute = [3, 4, 5, 1, 2];

console.log(canCompleteCircuitBruteForce(gasBrute, costBrute)); // Output: 3
