/*#*/
/**
 * Problem Definition:
 * -------------------
 * You are given an array of triplets `triples` (each triple = [a,b,c]) 
 * and a `target` triple = [x,y,z].
 * You can "merge" triplets by choosing values from any triple at a position:
 * - The merged triple's i-th value is chosen from any triple's i-th value,
 *   but only if all selected triples' values do not exceed the target at that position.
 * Return true if you can form the `target` triple exactly by merging some of the triplets.
 *
 * Intuition:
 * ----------
 * Ignore any triple that exceeds the target in any position, since they can't contribute.
 * Track the largest b and c values among the valid triples (we don't need to track 'a'
 * because to match target[0], one valid triple must have a == target[0] already).
 * If, after processing all triples, the maximum b and c equal the target's b and c,
 * and some triple also matched target[0], then the target is achievable.
 *
 * Logic:
 * ------
 * 1. Initialize maxB = 0 and maxC = 0.
 * 2. For each triple [a,b,c]:
 *    - If any value exceeds the target in that position, skip it.
 *    - Otherwise, update maxB and maxC if b or c are larger than current maxima.
 * 3. After processing:
 *    - Return true if maxB == target[1] and maxC == target[2].
 *    - 'a' must be satisfied implicitly by having a triple where a == target[0].
 */

function mergeTriplets(triples, target) {
    let maxB = 0, maxC = 0;
    for (const [a, b, c] of triples) {
        // Only consider triples that don't exceed target in any dimension
        if (a <= target[0] && b <= target[1] && c <= target[2]) {
            if (b > maxB) maxB = b;  // track largest b
            if (c > maxC) maxC = c;  // track largest c
        }
    }
    // To form target, we must match target's b and c
    return maxB === target[1] && maxC === target[2];
}

// -------- Driver Code --------
function main() {
    const triples = [[2,5,3],[1,8,4],[1,7,5],[2,3,5]];
    const target = [2,7,5];
    const result = mergeTriplets(triples, target);
    console.log(`Triples: ${JSON.stringify(triples)}`);
    console.log(`Target: ${JSON.stringify(target)}`);
    console.log(`Can merge to target: ${result}`); // Expected: true
}

main();
