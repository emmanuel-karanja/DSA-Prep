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

const MinHeap=require('../Heap/MinHeap')
function trapRainWater(heightMap) {
    const m = heightMap.length;
    const n = heightMap[0].length;

    if (m < 3 || n < 3) return 0; // No space to trap if there are less than 3 bars in any direction

    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    //MinHeap as before. First you are tested to see if you can implement a MinHeap
    const heap = new MinHeap();

    // Add all border cells to heap
    for (let i = 0; i < m; i++) {
        //points in the heap contain direction and elevation
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

    const dirs = [
        [0, 1], [1, 0], [0, -1], [-1, 0]
    ];
    let water = 0;

    while (heap.size() > 0) {
        //same as shift()
        //currentCell
        const currentCell = heap.extractMin();
        //generate neighbours
        for (const [dx, dy] of dirs) {
            const x = currentCell.x + dx;
            const y = currentCell.y + dy;

            if (x >= 0 && x < m && y >= 0 && y < n && !visited[x][y]) {
                visited[x][y] = true;
                const neighborHeight = heightMap[x][y];
                //incase the neighbour is taller giving negative values, test for max with 0.
                water += Math.max(0, currentCell.height - neighborHeight);
                heap.insert({ x, y, height: Math.max(neighborHeight, currentCell.height) });
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