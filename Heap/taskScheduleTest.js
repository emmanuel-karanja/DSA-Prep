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

function leastInterval(tasks, n) {
    const freqMap = {};
    const timeline = []; // ← For console.table()

    // Count task frequencies
    for (let task of tasks) {
        freqMap[task] = (freqMap[task] || 0) + 1;
    }

    const heap = new MaxHeap();
    for (let [task, count] of Object.entries(freqMap)) {
        heap.insert({ task, count });
    }

    let time = 0;

    while (heap.size() > 0) {
        const temp = [];

        for (let i = 0; i <= n; i++) {
            if (heap.size() > 0) {
                let { task, count } = heap.extractMax();
                timeline.push({ Time: time, Action: `Run ${task}` });
                if (count > 1) {
                    temp.push({ task, count: count - 1 });
                }
            } else {
                // Idle if no task available
                if (temp.length > 0) {
                    timeline.push({ Time: time, Action: "Idle" });
                } else {
                    // All done, exit early
                    break;
                }
            }

            time++;
        }

        for (let entry of temp) {
            heap.insert(entry);
        }
    }

    console.table(timeline);
    return time;
}

// Example usage
leastInterval(['A','A','A','B','B','B'], 2);
