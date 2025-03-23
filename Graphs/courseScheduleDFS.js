 /**
  * 
  * LOGIC
  * 
  * 1. First convert to b->a i.e. course=>prerequisite
  * 2. Have a visited array or set
  * 3. DFS with visited and visiting.
  */

function canFinish(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => []);

    for (const [a, b] of prerequisites) {
        graph[b].push(a); // b → a
    }

    const visited = new Array(numCourses).fill(0);

    function dfs(course) {
        if (visited[course] === 1) return false; // cycle!
        if (visited[course] === 2) return true;  // already processed

        visited[course] = 1; // mark as visiting

        for (let neighbor of graph[course]) {
            if (!dfs(neighbor)) return false;
        }

        visited[course] = 2; // mark as fully visited
        return true;
    }

    for (let i = 0; i < numCourses; i++) {
        if (!dfs(i)) return false;
    }

    return true;
}
