/**Imagine now the heights are a grid, and now you have a 2D map.
 * 
 * LOGiC:
 * hTis is essentially a BFS with a priority queue (min-heap):

 1. Push all border cells into the heap since water cannot be trapped beyond borders and mark
    them as visited.
 2. Mark them as visited.
 3. While the heap is not empty:
      - Pop the lowest elevation cell.
      - For each of its 4 neighbors (up/down/left/right):
        If not visited:
            - Water trapped = max(0, height - neighborHeight)
            - Add trapped water to result.
            - Push max(height, neighborHeight) into the heap (because water can rise).


**Think of it as a normal BFS but now using a MinHeap and not a Queue.

THIS IS ADVANCED HARD!
 */

class MinHeap {
    constructor() {
        this.data = [];
    }

    size() {
        return this.data.length;
    }

    insert(node) {
        this.data.push(node);
        this._heapifyUp();
    }

    extractMin() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.data.pop();

        const min = this.data[0];
        this.data[0] = this.data.pop();
        this._heapifyDown();
        return min;
    }

    _heapifyUp() {
        let idx = this.size() - 1;
        while (idx > 0) {
            let parent = Math.floor((idx - 1) / 2);
            if (this.data[idx].height >= this.data[parent].height) break;
            [this.data[idx], this.data[parent]] = [this.data[parent], this.data[idx]];
            idx = parent;
        }
    }

    _heapifyDown() {
        let idx = 0;
        const length = this.size();

        while (true) {
            let left = 2 * idx + 1;
            let right = 2 * idx + 2;
            let smallest = idx;

            if (left < length && this.data[left].height < this.data[smallest].height) {
                smallest = left;
            }
            if (right < length && this.data[right].height < this.data[smallest].height) {
                smallest = right;
            }
            if (smallest === idx) break;

            [this.data[idx], this.data[smallest]] = [this.data[smallest], this.data[idx]];
            idx = smallest;
        }
    }
}

function trapRainWater(heightMap) {
    const m = heightMap.length;
    const n = heightMap[0].length;

    if (m < 3 || n < 3) return 0;

    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    const heap = new MinHeap();

    // Push border cells into heap
    for (let i = 0; i < m; i++) {
        heap.insert({ x: i, y: 0, height: heightMap[i][0] });
        heap.insert({ x: i, y: n - 1, height: heightMap[i][n - 1] });
        visited[i][0] = true;
        visited[i][n - 1] = true;
    }

    for (let j = 1; j < n - 1; j++) {
        heap.insert({ x: 0, y: j, height: heightMap[0][j] });
        heap.insert({ x: m - 1, y: j, height: heightMap[m - 1][j] });
        visited[0][j] = true;
        visited[m - 1][j] = true;
    }

    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let water = 0;

    while (heap.size() > 0) {
        const cell = heap.extractMin();

        for (const [dx, dy] of dirs) {
            const x = cell.x + dx;
            const y = cell.y + dy;

            if (x >= 0 && x < m && y >= 0 && y < n && !visited[x][y]) {
                visited[x][y] = true;
                const neighborHeight = heightMap[x][y];
                water += Math.max(0, cell.height - neighborHeight);
                heap.insert({
                    x,
                    y,
                    height: Math.max(neighborHeight, cell.height)
                });
            }
        }
    }

    return water;
}

/**O(m * n * log(m * n)) — due to heap operations */

const heightMap = [
    [1,4,3,1,3,2],
    [3,2,1,3,2,4],
    [2,3,3,2,3,1]
  ];
  
  console.log(trapRainWater(heightMap)); // Output: 4