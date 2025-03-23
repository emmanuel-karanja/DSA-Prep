class MaxHeap {
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

    extractMax() {
        if (this.data.length === 0) return null;
        const max = this.data[0];
        const end = this.data.pop();
        if (this.data.length > 0) {
            this.data[0] = end;
            this._bubbleDown();
        }
        return max;
    }

    _bubbleUp() {
        let i = this.data.length - 1;
        const el = this.data[i];
        while (i > 0) {
            let parent = Math.floor((i - 1) / 2);

            if (this.data[parent] >= el) break; //we good for minHeap

            [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
            i = parent;
        }
    }

    display(){
        console.log(this.data);
    }

    size(){
       return this.data.length
    }

    _bubbleDown() {
        let i = 0;
        const length = this.data.length;
        const el = this.data[0];
        while (true) {
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            let largest = i;

             //Max Hep changes the < to >
            if (left < length && this.data[left] > this.data[largest]) largest = left;
            if (right < length && this.data[right] > this.data[largest]) largest = right;

            if (largest === i) break; //the end condition
            [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]];
            i = largest;
        }
    }
}

let heap = new MaxHeap();
heap.insert(5);
heap.insert(3);
heap.insert(7);
heap.insert(9);
heap.insert(11)
heap.insert(-1);
console.log(heap.extractMax()); // 1
console.log(heap.extractMax()); // 3
console.log(heap.peek());   
heap.display()    // 5

module.exports= MaxHeap