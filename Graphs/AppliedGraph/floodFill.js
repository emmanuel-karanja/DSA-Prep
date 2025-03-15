/**he Flood Fill algorithm is used to fill an area of a grid (or an image) with a new color, starting from a given pixel. It works similarly to the "paint bucket" tool in image editing software.

Given:

A 2D grid (image)
A starting pixel (sr, sc)
A new color
Change the color of the starting pixel and all connected pixels with the same initial color, using 4-directional (up, down, left, right) or 8-directional connectivity.

LOGIC

BFS or DFS can be applied here.

1. Check of the newColor and oldColor are the same.
2. Check the boundary conditions and whether that pixel has old color


KEY NOTE:

Whenever you are dealing with a matrix, just know that you'll

1. Mark as visited within the matrix.
2. Create a direction array of arrays
3. Generate the neighbours dynamically
4. Have to check for boundaries.
5. You can use either BFS or DFS, BFS tends to be much more clear.
6. Ask for clarity of whether you can connect only up,down,left and right or also consider direction

*/

function floodFill(image, sr, sc, newColor) {
    let oldColor = image[sr][sc];
    
    // Edge case: If already filled
    if (oldColor === newColor) return image;

    let queue = [[sr, sc]];
    let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    while (queue.length > 0) {
        let [r, c] = queue.shift();
        
        // Boundary and color check
        if (r < 0 || r >= image.length || c < 0 || c >= image[0].length || image[r][c] !== oldColor) {
            continue;
        }

        // Fill with new color
        image[r][c] = newColor;

        // Enqueue 4-directional neighbors
        for (let [dr, dc] of directions) {
            queue.push([r + dr, c + dc]);
        }
    }

    return image;
}
