/**You are given a list of tasks represented by capital letters (['A','A','A','B','B','B']) 
 * and a cooldown period n. You must schedule tasks such that:

The same task can't run again for n units of time.
Each unit of time executes either a task or is idle.
Return the minimum time required to finish all tasks.

To finish in the least amount of time, we want to:

Always run the most frequent available task
Wait (idle) only when all other tasks are cooling down
This is a perfect setup for a MaxHeap (most frequent task comes out first).*/

// Low budget maxHeap 
class MaxHeap {
    constructor() {
        this.data = [];
    }

    insert(val) {
        this.data.push(val);
        this.data.sort((a, b) => b - a); // Max heap behavior
    }

    extractMax() {
        return this.data.shift();
    }

    size() {
        return this.data.length;
    }
}

//Ask the interviewer if you can do this.
function leastInterval(tasks, n) {
    const freqMap = {};

    // 1. Count frequencies
    for (let task of tasks) {
        freqMap[task] = (freqMap[task] || 0) + 1;
    }

    // 2. Use MaxHeap (store just counts)
    const heap = new MaxHeap();
    for (let count of Object.values(freqMap)) {
        heap.insert(count);
    }

    let time = 0;

    // 3. Simulate execution with cooldown cycles
    while (heap.size() > 0) {
        const temp = [];

        // Process (n + 1) tasks per cycle
        for (let i = 0; i <= n; i++) {
            if (heap.size() > 0) {
                let count = heap.extractMax();
                if (count > 1) {
                    temp.push(count - 1); // Decrease task count
                }
            }
            time++;

            // Only break if heap is empty AND no pending tasks
            if (heap.size() === 0 && temp.length === 0) {
                return time; // We are completely done
            }
        }

        // Reinsert remaining tasks
        for (let count of temp) {
            heap.insert(count);
        }
    }

    return time;
}

// Example usage
console.log(leastInterval(['A','A','A','B','B','B'], 2));
