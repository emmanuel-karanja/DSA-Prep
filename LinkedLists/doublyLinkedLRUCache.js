
/**This version uses a hashMap and a doubly linked list 
 * 
 * In the map, key is anything, and the value is a doubly liked list.
 * 
 * Hashing is done under the hood by the Map data structure.
 * 
 * LOGIC:
 * 
 * Key references the node in the doubly linked list. Why doubly linked? We can access it in O(1) without having
 * to traverse the entire list. So, the map allows us to quickly get to the node.
 */

class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}


class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map(); // key -> node

        // Dummy head and tail
        this.head = new ListNode(0, 0);
        this.tail = new ListNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        if (!this.map.has(key)) return -1;

        const node = this.map.get(key);
        this._remove(node);
        this._addToFront(node);
        return node.value;
    }

    put(key, value) {
        if (this.map.has(key)) {
            this._remove(this.map.get(key));
        }

        const newNode = new ListNode(key, value);
        this._addToFront(newNode);
        this.map.set(key, newNode);

        if (this.map.size > this.capacity) {
            const lru = this.tail.prev;
            this._remove(lru);
            this.map.delete(lru.key);
        }
    }

    // Remove node from its current position
    _remove(node) {
        let prevPointer=node.prev;
        let nextPointer=node.next;
        prevPointer.next = node.next;
        nextPointer.prev = node.prev;
    }

    // Add node right after head
    _addToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }
}
