/**The Two Domino Flip Problem typically refers to aligning two rows of dominoes (represented as arrays) using
 *  the minimum number of flips so that at least one of the rows has all identical values.

Imagine you have two rows of dominoes, A and B, of the same length. Each position contains a number 
(like the face of a domino). Your goal is to determine the minimum number of flips needed to make either
 A or B consist of the same number entirely. A flip means swapping the values at a position between A[i] and B[i].
 
 LOGIC:

 Take this example: A = [2, 1, 2, 4, 2, 2]
                    B = [5, 2, 6, 2, 3, 2]


 we saying that we find the most common number of in A, e.g. in the example it's 2, and then, we find positions
  in A without the 2, and find see if we can swap with B? I.e. at the same index in  B are they the same, 
  if they are, we can flip? And then if A is fully only 2s we can now count those flips and do the same for
   B and find which would require minimal flips.


1.Identify the Most Likely Candidate for the Final Row
   - The only possible numbers that can fully fill a row are A[0] or B[0].
   - This is because any valid row must have at least one of these two numbers at every index.

2. Check If It’s Possible to Make Either Row Consistently That Number 
   - For each candidate (A[0] and B[0]), go through the entire array and check:
   - If an index i has neither A[i] nor B[i] as the candidate, it's impossible to make the entire row that number → 
     return -1.
   - Otherwise, count how many swaps (flips) are needed.
3.Count Swaps Required to Make Either A or B Fully That Number
   - If A[i] ≠ candidate, but B[i] == candidate, we flip (swap A[i] and B[i]).
   - If B[i] ≠ candidate, but A[i] == candidate, we flip (swap B[i] and A[i]).

The minimum number of swaps between making A all candidate vs. making B all candidate is our answer.

Return the Smallest Number of Swaps

If no solution is possible for either candidate, return -1.

Otherwise, return the minimum flips needed.
 
   
   */

//My approach Time O(n) and Space O(n)

var minDominoRotations = function(A, B) {
    let countA = new Map(), countB = new Map(), countSame = new Map();
    let n = A.length;

    // Count occurrences of each number in A, B, and both
    for (let i = 0; i < n; i++) {
        countA.set(A[i], (countA.get(A[i]) || 0) + 1);
        countB.set(B[i], (countB.get(B[i]) || 0) + 1);
        if (A[i] === B[i]) {
            countSame.set(A[i], (countSame.get(A[i]) || 0) + 1);
        }
    }

    // Check all possible candidates (numbers that appear in A[0] or B[0])
    for (let x of [A[0], B[0]]) {
        if ((countA.get(x) || 0) + (countB.get(x) || 0) - (countSame.get(x) || 0) === n) {
            return Math.min(n - (countA.get(x) || 0), n - (countB.get(x) || 0));
        }
    }
    
    return -1; // No valid swaps possible
};

//Optimal Time O(n) and Space O(1)
function minDominoRotationsOptimal(A, B) {
    function check(candidate) {
        let rotateA = 0, rotateB = 0;
        for (let i = 0; i < A.length; i++) {
            if (A[i] !== candidate && B[i] !== candidate) return Infinity; // Impossible case
            if (A[i] !== candidate) rotateA++; // Need to swap A
            if (B[i] !== candidate) rotateB++; // Need to swap B
        }
        return Math.min(rotateA, rotateB);
    }

    let rotations = Math.min(check(A[0]), check(B[0]));
    return rotations === Infinity ? -1 : rotations;
}

// Example usage:
console.log("quick:",minDominoRotations([2, 1, 2, 4, 2, 2], [5, 2, 6, 2, 3, 2])); // Output: 2
console.log("quick:",minDominoRotations([3, 5, 1, 2, 3], [3, 6, 3, 3, 4])); // Output: -1 (impossible)

console.log("optimal:",minDominoRotationsOptimal([2, 1, 2, 4, 2, 2], [5, 2, 6, 2, 3, 2])); // Output: 2
console.log("optimal:",minDominoRotationsOptimal([3, 5, 1, 2, 3], [3, 6, 3, 3, 4])); // Output: -1 (impossible)

