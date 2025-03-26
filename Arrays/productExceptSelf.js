
function productExceptSelf(nums) {
    let n = nums.length;
    let result = new Array(n).fill(1);

    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix =prefix * nums[i]; // Accumulate prefix product
    }

    let suffix = 1;
    //subtle, don't miss that the suffix starts from the back at n-1
    for (let i = n - 1; i >= 0; i--) {
        result[i] =result[i] * suffix; // Multiply by suffix product
        suffix =suffix* nums[i]; // Accumulate suffix product
    }

    return result;
}

// Test
console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
