/**
 * Time-Based Key-Value Store
 *
 * Problem Statement:
 * Design a time-based key-value store that can store multiple values for the same key at different timestamps,
 * and retrieve the value of a key at a certain timestamp.
 *
 * Implement:
 * - `set(key, value, timestamp)`: Stores the key and value along with the given timestamp.
 * - `get(key, timestamp)`: Returns a value such that `set` was called previously with timestamp <= given timestamp.
 *   - If there are multiple such values, return the value with the **largest timestamp**.
 *   - If no value exists, return an empty string "".
 *
 * Example:
 * const kv = new TimeMap();
 * kv.set("foo", "bar", 1);
 * kv.get("foo", 1); // "bar"
 * kv.get("foo", 3); // "bar"
 * kv.set("foo", "bar2", 4);
 * kv.get("foo", 4); // "bar2"
 * kv.get("foo", 5); // "bar2"
 *
 * Logic:
 * 1. Use a Map to store key -> array of {timestamp, value}.
 * 2. For `set`, push {timestamp, value} into the array for the key.
 * 3. For `get`, perform binary search on the array to find the largest timestamp <= given timestamp.
 *
 * Time Complexity:
 * - set: O(1)
 * - get: O(log n), where n = number of entries for that key
 * Space Complexity: O(n), total number of entries stored
 */

class TimeMap {
    constructor() {
        this.store = new Map();
    }

    set(key, value, timestamp) {
        if (!this.store.has(key)) {
            this.store.set(key, []);
        }
        this.store.get(key).push({ timestamp, value });
    }

    get(key, timestamp) {
        if (!this.store.has(key)) return "";

        const arr = this.store.get(key);
        let left = 0;
        let right = arr.length - 1;
        let result = "";

        // Binary search for largest timestamp <= given timestamp
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid].timestamp <= timestamp) {
                result = arr[mid].value; // valid candidate
                left = mid + 1;          // search right to find later timestamp <= timestamp
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
}

// Example usage
const kv = new TimeMap();
kv.set("foo", "bar", 1);
console.log(kv.get("foo", 1)); // "bar"
console.log(kv.get("foo", 3)); // "bar"
kv.set("foo", "bar2", 4);
console.log(kv.get("foo", 4)); // "bar2"
console.log(kv.get("foo", 5)); // "bar2"
