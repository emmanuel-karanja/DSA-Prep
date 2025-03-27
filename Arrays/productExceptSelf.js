/**Given an array of numbers find the array containing the product of a number at i except self.
 * Don't use division and do it in O(n)
 * 
 * LOGIC:
 * We’ll build the solution in two passes:

1. Left pass — for each index i, store the product of all elements to the left of i.
2. Right pass — for each index i, multiply by the product of all elements to the right of i.
 */


function productExceptSelf(nums) {
    const n = nums.length;
    const result = Array(n).fill(1);

    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        //this is the next leftProduct we are calculating here
        leftProduct =leftProduct * nums[i];
    }

    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] = result[i] * rightProduct;
        rightProduct = rightProduct * nums[i];
    }

    return result;
}

// Test
console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
