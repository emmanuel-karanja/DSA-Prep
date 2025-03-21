/**[HARD]
 * 
 * Given an unsorted array of distinct numbers, find the minimum number of swaps required to sort the array in ascending order.
 * 
 *  Intuition
Think of this as a graph problem:

Each index points to another index where its correct value should be.
The array can be broken into cycles of misplaced numbers.
Each cycle of size K needs K-1 swaps to correct it.
 

Time O(nlogn) due to the sorting

*/

function minSwapsToSort(arr) {
    let n = arr.length;
    let swaps = 0;
    
    // Step 1: Store value and original index
    let sortedArr = arr.map((val, idx) => ({val, idx}));
    
    // Step 2: Sort by value
    sortedArr.sort((a, b) => a.val - b.val);
    
    // Step 3: Visited array
    let visited = new Array(n).fill(false);
    
    // Step 4: Find cycles
    for (let i = 0; i < n; i++) {
        //this is in the correct place so continue
        if (visited[i] || sortedArr[i].idx === i) continue;

        let cycleSize = 0;
        let j = i;
        
        while (!visited[j]) {
            visited[j] = true;
            j = sortedArr[j].idx; // Move to the correct index
            cycleSize++;
        }

        if (cycleSize > 1) swaps += (cycleSize - 1);
    }
    
    return swaps;
}

// Example
console.log(minSwapsToSort([4, 3, 2, 1]));  // Output: 3
console.log(minSwapsToSort([7, 16, 14, 17, 6, 9, 5, 3]));  // Output: 5
