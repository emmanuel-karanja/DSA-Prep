/**The K-Nearest Neighbors (KNN) problem involves finding the k closest points to a given point in a
 *  dataset based on some distance metric (e.g., Euclidean distance).
 * It's commonly used in:

1. Machine Learning (Classification & Regression)
2. Computational Geometry
3. Recommendation Systems
4. Anomaly Detection

Commonly used Distance functions:

1. Euclidean distance
2. Manhattan distance--for grid based search
3. Cosine similarity--for text/data similarity problems

*/

/**Brute Force Time O(NlogN) due to sorting
 * 
 * LOGIC
 * 
 * 1. Compute distances for all points.
 * 2. Sort the distances in ascending order
 * 3. Get the first k of them.
 * 4. Return those points
 */

function kClosest(points, k, target) {
    return points
        .map(point => ({ point, dist: Math.hypot(point[0] - target[0], point[1] - target[1]) }))
        .sort((a, b) => a.dist - b.dist) // Sort by distance
        .slice(0, k) // Get k closest points
        .map(entry => entry.point);
}

// Example Usage:
const points = [[1, 2], [3, 4], [2, -1], [5, 1]];
const target = [2, 3];
console.log(kClosest(points, 2, target)); // Output: [[1,2], [3,4]]

/**Using a max-heap 
 * 
 * LOGIC:
 * 1.Use a Max Heap to maintain the k closest points.
   2.Store distances in the heap so that the farthest point is at the root.
   3.If a new point is closer than the farthest, remove the farthest and insert the new point.
 */

   class MaxHeap {
    constructor(k) {
        this.heap = [];
        this.k = k;
    }

    parent(i) { return Math.floor((i - 1) / 2); }
    leftChild(i) { return 2 * i + 1; }
    rightChild(i) { return 2 * i + 2; }

    // Insert a new element
    push(point, distance) {
        this.heap.push({ point, distance });
        this._heapifyUp();

        // Remove the farthest point if heap exceeds k
        if (this.heap.length > this.k) {
            this.pop();
        }
    }

    // Remove max (farthest point)
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown();
        return max;
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    _heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = this.parent(index);
            if (this.heap[index].distance <= this.heap[parentIndex].distance) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    _heapifyDown() {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            let left = this.leftChild(index);
            let right = this.rightChild(index);
            let largest = index;

            if (left < length && this.heap[left].distance > this.heap[largest].distance) {
                largest = left;
            }

            if (right < length && this.heap[right].distance > this.heap[largest].distance) {
                largest = right;
            }

            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}

// Function to find k-nearest points
function kNearestNeighbors(points, target, k) {
    const heap = new MaxHeap(k);

    for (const point of points) {
        let distance = Math.sqrt((point[0] - target[0]) ** 2 + (point[1] - target[1]) ** 2);
        heap.push(point, distance);
    }

    return heap.heap.map(entry => entry.point);
}

// Example Usage
const points2 = [[1, 2], [2, 3], [3, 4], [5, 6], [7, 8]];
const target2 = [3, 3];
const k = 3;
console.log(kNearestNeighbors(points2, target2, k)); // Returns the 3 nearest points
