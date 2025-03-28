/**You're given an m x n matrix of heights representing an island where:
Top & Left edges touch the Pacific Ocean.
Bottom & Right edges touch the Atlantic Ocean.

Goal: Return list of coordinates where water can flow to both oceans. 

LOGIC:
Water can only flow:

From a cell to neighboring cells (up, down, left, right)
If the neighbor’s height is less than or equal to the current cell.
So water flows from high to low or same level, and can’t go uphill.

Instead of checking from each cell if it can reach both oceans, reverse the flow:
1.Start from the Pacific edge, mark cells that can flow into it.
2.Start from the Atlantic edge, mark cells that can flow into it.
3.The intersection of those two sets is your answer.
*/

function pacificAtlantic(heights) {
    const rows = heights.length;
    const cols = heights[0].length;

    const pacific = Array.from({ length: rows }, () => Array(cols).fill(false));
    const atlantic = Array.from({ length: rows }, () => Array(cols).fill(false));

    const directions = [[1,0], [-1,0], [0,1], [0,-1]];

    function dfs(r, c, visited, prevHeight) {
        // Out of bounds or already visited or can't flow uphill
        if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c] || heights[r][c] < prevHeight) return;

        visited[r][c] = true;

        for (const [dr, dc] of directions) {
            dfs(r + dr, c + dc, visited, heights[r][c]);
        }
    }

    // Step 1: DFS from Pacific (top row and left column)
    for (let c = 0; c < cols; c++) dfs(0, c, pacific, heights[0][c]); // top
    for (let r = 0; r < rows; r++) dfs(r, 0, pacific, heights[r][0]); // left

    // Step 2: DFS from Atlantic (bottom row and right column)
    for (let c = 0; c < cols; c++) dfs(rows - 1, c, atlantic, heights[rows - 1][c]); // bottom
    for (let r = 0; r < rows; r++) dfs(r, cols - 1, atlantic, heights[r][cols - 1]); // right

    // Step 3: Collect coordinates that can reach both oceans, find intersection
    const result = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (pacific[r][c] && atlantic[r][c]) {
                result.push([r, c]);
            }
        }
    }

    return result;
}

const heights = [
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4]
  ];
  
  console.log(pacificAtlantic(heights));
  // Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
  
