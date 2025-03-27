/**Given a binary array move zeroes to one side in O(n)
 * 
 * LOGIC:\
1. Instead of pushing zeroes to the end (which is common), this time we want them at the beginning. The idea is:
2. Traverse the array from end to start
3. Copy non-zero elements to the back of the array (from the last index)
4. Fill the remaining positions with 0
 */

function moveZeroesToStart(arr) {
    let n = arr.length;
    let write = n - 1;

    // Step 1: Write non-zeroes from end to start
    for (let i = n - 1; i >= 0; i--) {
        if (arr[i] !== 0) {
            arr[write] = arr[i];
            write--;
        }
    }

    // Step 2: Fill the rest with zeroes at the beginning
    for (let i = 0; i <= write; i++) {
        arr[i] = 0;
    }

    return arr;
}
