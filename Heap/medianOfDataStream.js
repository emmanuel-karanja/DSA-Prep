/**To maintain the median dynamically as numbers stream in:

✅ Use two heaps:

A MaxHeap for the left half (smaller values)
A MinHeap for the right half (larger values) */

const MaxHeap=require("./MaxHeap")
const MinHeap=require("./MinHeap")
class MedianFinder {
    constructor() {
        // MaxHeap for smaller half
        this.left = new MaxHeap();
        // MinHeap for larger half
        this.right = new MinHeap();
    }

    addNum(num) {
        // Step 1: Insert into MaxHeap
        this.left.insert(num);

        // Step 2: Balance left to right
        this.right.insert(this.left.extractMax());

        // Step 3: Maintain size property
        if (this.right.size() > this.left.size()) {
            this.left.insert(this.right.extractMin());
        }
    }

    findMedian() {
        if (this.left.size() > this.right.size()) {
            return this.left.peek();
        } else {
            return (this.left.peek() + this.right.peek()) / 2;
        }
    }
}

const mf = new MedianFinder();

mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian()); // → 1.5

mf.addNum(3);
console.log(mf.findMedian()); // → 2
