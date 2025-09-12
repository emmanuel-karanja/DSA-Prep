/*#*/
/**
 * Problem Statement:
 * -----------------
 * Design a time-based key-value store that can store multiple values for the same key at different timestamps.
 * 
 * Implement the TimeMap class:
 * - set(key, value, timestamp): Stores the key with the value at the given timestamp.
 * - get(key, timestamp): Returns the value such that set(key, value, t) was called previously with t <= timestamp.
 *   If there are multiple such values, return the one with the largest t. If none, return "".
 * 
 * Example:
 * ----------
 * Input:
 * tm = new TimeMap();
 * tm.set("foo", "bar", 1);
 * tm.get("foo", 1); // returns "bar"
 * tm.get("foo", 3); // returns "bar"
 * tm.set("foo", "bar2", 4);
 * tm.get("foo", 4); // returns "bar2"
 * tm.get("foo", 5); // returns "bar2"
 * 
 * Intuition:
 * ----------
 * 1. Use a Map to store key → list of [timestamp, value] pairs.
 * 2. For get():
 *    - Use binary search on the timestamp list to find the largest timestamp <= query timestamp.
 *    - This ensures O(log n) retrieval for each key's history.
 */

class TimeMap {
    constructor() {
        this.map = new Map(); // key -> list of [timestamp, value]
    }

    /**
     * Stores the value for a key at a specific timestamp
     * @param {string} key 
     * @param {string} value 
     * @param {number} timestamp 
     */
    set(key, value, timestamp) {
        if (!this.map.has(key)) {
            this.map.set(key, []); // Initialize array if key doesn't exist
        }
        this.map.get(key).push([timestamp, value]); // Append [timestamp, value]
    }

    /**
     * Retrieves the value with largest timestamp <= query timestamp
     * @param {string} key 
     * @param {number} timestamp 
     * @returns {string}
     */
    get(key, timestamp) {
        const arr = this.map.get(key) || []; // Get the array of [timestamp, value]
        let l = 0, r = arr.length - 1;
        let res = ""; // Default if no timestamp <= query

        // Binary search for the largest timestamp <= query timestamp
        while (l <= r) {
            const m = Math.floor((l + r) / 2);
            if (arr[m][0] <= timestamp) {
                res = arr[m][1]; // Update result
                l = m + 1;       // Look for a later timestamp
            } else {
                r = m - 1;       // Move left
            }
        }

        return res;
    }
}

// Driver code to test TimeMap
const tm = new TimeMap();
tm.set("foo", "bar", 1);
console.log(tm.get("foo", 1)); // Expected: "bar"
console.log(tm.get("foo", 3)); // Expected: "bar"
tm.set("foo", "bar2", 4);
console.log(tm.get("foo", 4)); // Expected: "bar2"
console.log(tm.get("foo", 5)); // Expected: "bar2"
console.log(tm.get("foo", 0)); // Expected: ""
