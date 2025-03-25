/**
 * Design a data structure that:
Supports get(key) and put(key, value) operations in O(1) time.
Removes the least recently used item when capacity is exceeded.

LOGIC?

1. When an item is accessed, it's promoted to the front of the queue and only the ones at the tail end
  without hits are removed.

 */

  class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // key → value
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }

        const value = this.cache.get(key);
        // Re-insert key to move it to the "most recently used" end
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key); // remove old
        }

        this.cache.set(key, value); // insert new (at end)

        if (this.cache.size > this.capacity) {
            // Remove least recently used (first inserted)
            const lruKey = this.cache.keys().next().value;
            this.cache.delete(lruKey);
        }
    }
}

const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1)); // returns 1
lru.put(3, 3);           // evicts key 2
console.log(lru.get(2)); // returns -1 (not found)
lru.put(4, 4);           // evicts key 1
console.log(lru.get(1)); // returns -1 (not found)
console.log(lru.get(3)); // returns 3
console.log(lru.get(4)); // returns 4
