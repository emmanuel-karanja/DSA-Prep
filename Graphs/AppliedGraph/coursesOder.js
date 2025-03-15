/**You're given numCourses (N) courses labeled 0 to N-1 and a list of prerequisite pairs [a, b], where:

b must be completed before a (i.e., b → a).
Return a valid order of courses to take if possible.
If it's impossible (i.e., there’s a cycle), return an empty list [].

LOGIC:

1. turn the whole thing into an adjacency list i.e.
2. Do DFS to detect cycles
3. Maintain a visited array:
    0 → Not visited
    1 → Visiting (detect cycles)
    2 → Processed (safe)
4. If a cycle is found (1 → 1 back-edge), return [].
*/

function findOrderDFS(numCourses, prerequisites) {
    let adjList = new Array(numCourses).fill(0).map(() => []);
    
    // Build adjacency list
    for (let [course, pre] of prerequisites) {
        adjList[pre].push(course);
    }

    let visited = new Array(numCourses).fill(0);
    let stack = [];
    let hasCycle = false;

    function dfs(course) {
        if (visited[course] === 1) {
            hasCycle = true;
            return;
        }
        if (visited[course] === 2) return;

        visited[course] = 1;
        for (let nextCourse of adjList[course]) {
            dfs(nextCourse);
        }
        visited[course] = 2;
        stack.push(course);
    }

    for (let i = 0; i < numCourses; i++) {
        if (visited[i] === 0) dfs(i);
    }

    return hasCycle ? [] : stack.reverse();
}


function findOrder(numCourses, prerequisites) {
    let adjList = new Array(numCourses).fill(0).map(() => []);
    let inDegree = new Array(numCourses).fill(0);
    
    // Build adjacency list and compute in-degrees
    for (let [course, pre] of prerequisites) {
        adjList[pre].push(course);
        inDegree[course]++;
    }

    let queue = [];
    let order = [];
    
    // Enqueue courses with no prerequisites
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    // Process queue
    while (queue.length > 0) {
        let course = queue.shift();
        order.push(course);

        for (let nextCourse of adjList[course]) {
            inDegree[nextCourse]--;
            if (inDegree[nextCourse] === 0) queue.push(nextCourse);
        }
    }

    return order.length === numCourses ? order : [];
}
