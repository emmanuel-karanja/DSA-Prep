class MinHeap {
    constructor() {
        this.data = [];
    }

    insert(val) {
        this.data.push(val);
        this._bubbleUp();
    }

    peek() {
        return this.data[0];
    }

    extractMin() {
        if (this.data.length === 0) return null;
        const min = this.data[0];
        const end = this.data.pop();
        if (this.data.length > 0) {
            this.data[0] = end;
            this._bubbleDown();
        }
        return min;
    }

    _bubbleUp() {
        let i = this.data.length - 1;
        const el = this.data[i];
        while (i > 0) {
            let parent = Math.floor((i - 1) / 2);

            if (this.data[parent] <= el) break; //we good for minHeap

            [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
            i = parent;
        }
    }

    display(){
        console.log(this.data);
    }

    size(){
        return this.data.length;
    }
    _bubbleDown() {
        let i = 0;
        const length = this.data.length;
        const el = this.data[0];
        while (true) {
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            let smallest = i;

             //Max Hep changes the < to >
            if (left < length && this.data[left] < this.data[smallest]) smallest = left;
            if (right < length && this.data[right] < this.data[smallest]) smallest = right;

            if (smallest === i) break; //the end condition
            [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
            i = smallest;
        }
    }
}

let heap = new MinHeap();
heap.insert(5);
heap.insert(3);
heap.insert(7);
heap.insert(9);
heap.insert(11)
heap.insert(-1);
console.log(heap.extractMin()); // 1
console.log(heap.extractMin()); // 3
console.log(heap.peek());   
heap.display()    // 5

module.exports=MinHeap