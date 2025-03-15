/**Merge k sorted arrays:
 * LOGIC
 * 
 * 1. Do pair wise merge
 * 
 * Time O(NlogN) Space O(N)
 */

function mergeKSortedArrays(arrays){
    if(arrays.length===0) return [];
    if(arrays.length ===1) return arrays;

    let merged=mergePair(arrays[0],arrays[1]);
    for(let i=2;i<arrays.length;i++){
        merged=mergePair(merged,arrays[i]);
    }

    return merged;

}

/**This is one of the most crucial functions in sorting */
function mergePair(arr1, arr2) {
    let i = 0, j = 0;
    let result = [];

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }

    // Add any remaining elements
    while (i < arr1.length) result.push(arr1[i++]);
    while (j < arr2.length) result.push(arr2[j++]);

    return result;
}