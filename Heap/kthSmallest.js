/**Given an array find the kth smallest */
const MaxHeap=require("./MaxHeap")

function kthSmallest(arr, k) {
    const maxHeap = new MaxHeap // MaxHeap

    for (let num of arr) {
        maxHeap.insert(num);
        if (maxHeap.size() > k) {
            maxHeap.extractMax(); // Remove the largest of the k
        }
    }

    return maxHeap.peek(); // kth smallest element
}

const arr = [7, 10, 4, 3, 20, 15]
const k = 3
// Output: 7 (3rd smallest element is 7)

console.log(kthSmallest(arr,k))

