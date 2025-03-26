/**The K-Nearest Neighbors (KNN) problem involves finding the k closest points to a given point in a
 *  dataset based on some distance metric (e.g., Euclidean distance).
 * It's commonly used in:

1. Machine Learning (Classification & Regression)
2. Computational Geometry
3. Recommendation Systems
4. Anomaly Detection

Commonly used Distance functions:

1. Euclidean distance
2. Manhattan distance--Manhattan distance is the total number of steps you’d take if you could only move up, 
                       down, left, or right (not diagonally) on a grid — like you're walking through city blocks in Manhattan.
3. Cosine similarity--for text/data similarity problems

*/

/**Brute Force Time O(NlogN) due to sorting
 * 
 * LOGIC
 * 
 * 1. Compute distances for all points.
 * 2. Sort the distances in ascending order
 * 3. Get the first k of them.
 * 4. Return those points
 * 
 Time O(nlogn)
 */

function kClosest(points, k, target) {
    return points
        .map(point => ({ point, dist: Math.hypot(point[0] - target[0], point[1] - target[1]) }))
        .sort((a, b) => a.dist - b.dist) // Sort by distance
        .slice(0, k) // Get k closest points
        .map(entry => entry.point);
}

// Example Usage:
const points = [[1, 2], [3, 4], [2, -1], [5, 1]];
const target = [2, 3];
console.log(kClosest(points, 2, target)); // Output: [[1,2], [3,4]]
