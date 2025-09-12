/*#*/
/**
 * Union-Find (Disjoint Set Union – DSU)
 * -------------------------------------
 * This is a data structure to efficiently keep track of a set of elements 
 * partitioned into disjoint (non-overlapping) subsets. 
 * 
 * Key Operations:
 *  - find(x): Find the representative (root) of the set containing x.
 *  - union(x, y): Merge the sets containing x and y.
 *  - connected(x, y): Check if x and y belong to the same set.
 * 
 * Use Cases:
 *  - Detecting cycles in an undirected graph.
 *  - Kruskal’s Minimum Spanning Tree algorithm.
 *  - Counting connected components in a graph.
 *  - Network connectivity and clustering problems.
 * 
 * Optimizations:
 *  - Path Compression: Flattens the tree structure during find(), 
 *    making future operations faster.
 *  - Union by Rank (or Size): Always attach the smaller tree to the root 
 *    of the larger tree to avoid tall trees.
 * 
 * Time Complexity:
 *  - With optimizations, both find() and union() run in nearly O(1) 
 *    (specifically O(α(n)), where α is the inverse Ackermann function).
 */

class UnionFind {
    constructor(n) {
        // Initially, each element is its own parent (self root)
        this.parent = Array.from({ length: n }, (_, i) => i);
        // Rank array stores tree height approximation for union-by-rank
        this.rank = Array(n).fill(1);
    }

    // Find the representative of set x with path compression
    find(x) {
        if (this.parent[x] !== x) {
            // Recursively find the root and compress path
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    // Union two sets using union by rank
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false; // Already in the same set

        // Attach the smaller tree under the larger one
        if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX] += 1;
        }
        return true;
    }

    // Check if two elements are in the same set
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}

// -------- Driver Code Example --------
function main() {
    const uf = new UnionFind(5); // Elements: 0,1,2,3,4

    uf.union(0, 1); // Merge sets containing 0 and 1
    uf.union(1, 2); // Merge sets containing 1 and 2
    console.log(uf.connected(0, 2)); // true (0 and 2 are connected)
    console.log(uf.connected(0, 3)); // false (0 and 3 are not connected)

    uf.union(3, 4); // Merge sets containing 3 and 4
    console.log(uf.connected(3, 4)); // true

    uf.union(2, 3); // Merge sets containing 2 and 3
    console.log(uf.connected(0, 4)); // true (all 0-4 are now connected)
}

main();
