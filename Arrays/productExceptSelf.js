/**Given an array of numbers find the array containing the product of a number at i except self.
 * Don't use division and do it in O(n)
 * 
 * LOGIC:
 * We’ll build the solution in two passes:

1. Left pass — for each index i, store the product of all elements to the left of i.
2. Right pass — for each index i, multiply by the product of all elements to the right of i.
 */

//Time O(n) and Space O(n)

function productExceptSelf(nums) {
    const n = nums.length;

    //initialize, the first in any of the arrays will always be 1.
    const leftProduct = Array(n).fill(1);
    const rightProduct = Array(n).fill(1);
    const result = Array(n).fill(1);

    // Compute leftProduct, i from 1since we need i-1 to work
    for (let i = 1; i < n; i++) {
        //product of all the numbers left of nums[i]
        leftProduct[i] = nums[i - 1] * leftProduct[i - 1];
    }

    // Compute rightProduct
    for (let i = n - 2; i >= 0; i--) {
        // product of all the numbers right of nums[i]
        rightProduct[i] = nums[i + 1] * rightProduct[i + 1];
    }

    // Multiply left and right
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct[i] * rightProduct[i];
    }

    return result;
}


//Time O(n) and space  O(n)


function productExceptSelfOptimal(nums) {
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
        //calculate the next right product
        rightProduct = rightProduct * nums[i];
    }

    return result;
}

// Test
console.log("verbose",productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
console.log("Optimal",productExceptSelfOptimal([1, 2, 3, 4])); // [24, 12, 8, 6]
