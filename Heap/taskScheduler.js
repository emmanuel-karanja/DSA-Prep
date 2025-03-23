/**You are given a list of tasks represented by capital letters (['A','A','A','B','B','B']) 
 * and a cooldown period n. You must schedule tasks such that:

The same task can't run again for n units of time.
Each unit of time executes either a task or is idle.
Return the minimum time required to finish all tasks.

To finish in the least amount of time, we want to:

Always run the most frequent available task
Wait (idle) only when all other tasks are cooling down
This is a perfect setup for a MaxHeap (most frequent task comes out first).*/

function leastInterval(tasks, n) {
    const freqMap = {};

    // 1. Count frequencies
    for (let task of tasks) {
        freqMap[task] = (freqMap[task] || 0) + 1;
    }

    // 2. Use your MaxHeap (store just counts for now)
    const heap = new MaxHeap();
    for (let count of Object.values(freqMap)) {
        heap.insert(count);
    }

    let time = 0;

    // 3. Simulate execution with cooldown cycles
    while (heap.size() > 0) {
        const temp = [];

        // 1 cycle of n+1 slots
        for (let i = 0; i <= n; i++) {
            if (heap.size() > 0) {
                let count = heap.extractMax();
                if (count > 1) {
                    temp.push(count - 1); // decrease task count
                }
            }
            time++;

            if (heap.size() === 0 && temp.length === 0) break; // we're done
        }

        for (let count of temp) {
            heap.insert(count); // reinsert remaining tasks
        }
    }

    return time;
}
