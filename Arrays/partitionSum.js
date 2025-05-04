function findValidSubarrays(arr) {
    const results = [];
    const totalSum = arr.reduce((a, b) => a + b, 0);
    const n = arr.length;

    // Generate all subsets of arr
    const generateSubsets = (start = 0, subset = []) => {
        if (subset.length > 0 && subset.length < n - subset.length) {
            const sumA = subset.reduce((a, b) => a + b, 0);
            const sumB = totalSum - sumA;

            if (sumA > sumB) {
                const sortedSubset = [...subset].sort((a, b) => a - b);
                // Avoid duplicates
                if (!results.some(res => JSON.stringify(res) === JSON.stringify(sortedSubset))) {
                    results.push(sortedSubset);
                }
            }
        }

        for (let i = start; i < arr.length; i++) {
            subset.push(arr[i]);
            generateSubsets(i + 1, subset);
            subset.pop();
        }
    };

    generateSubsets();
    return results;
}

// Example usage:
const arr = [3, 7, 5, 6, 2];
console.log(findValidSubarrays(arr));


function findValidSubarraysGreedy(arr) {
    // Sort the array in descending order to prioritize larger elements for subset A
    arr.sort((a, b) => b - a);
    
    const totalSum = arr.reduce((a, b) => a + b, 0);
    const n = arr.length;
    const results = [];

    // Try to build a valid subset A and subset B
    let sumA = 0, sumB = totalSum;
    const subsetA = [];
    const subsetB = [...arr];

    for (let i = 0; i < n; i++) {
        // Add element arr[i] to subset A
        subsetA.push(arr[i]);
        sumA += arr[i];
        sumB -= arr[i];

        // Ensure the size of A is smaller than B
        if (subsetA.length >= n - subsetA.length) break;

        // Check if the sum of A is greater than sum of B
        if (sumA > sumB) {
            // If the condition holds, add this partition to the results
            results.push([...subsetA].sort((a, b) => a - b));
        }
    }

    return results;
}

const arr1 = [3, 7, 5, 6, 2];
console.log(findValidSubarraysGreedy(arr1));