/** Find the duplicate in array
 * 
 * LOGIC:
 * 
 * 1. Traverse the array from right to left, insert the element into a set, and as you continue 
 *    check of the number is already in the set, if it's, add it to a duplicates results array
 */

function findDuplicates(arr=[]){
    const result=[];

    if(arr.length < 2) return []

    const nums=new Set();
    for(let i=0;i<arr.length;i++){
        if(nums.has(arr[i])){
            result.push(arr[i]);
        }
    }
    return result;

}

//above Time O[n] and Space O(n) due to set and result array


//Below is called Floyd's cycle and it does in Time O(n) and Space O(1)
// Treat the array like a linked list.
function findDuplicate(nums) {
    let slow = nums[0];
    let fast = nums[0];

    // Phase 1: Detect cycle
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);

    // Phase 2: Find entrance (duplicate)
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow;
}
