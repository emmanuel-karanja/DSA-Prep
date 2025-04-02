/**You are given:

numCourses: The total number of courses labeled from 0 to numCourses - 1.
prerequisites: An array where prerequisites[i] = [a, b] means that you must take course b before course a.
Return true if it is possible to finish all courses, otherwise return false.

LOGIC:

1. Build an adjacency list out of the prerequiste array where each element is [a,b] where b must be completed before a.
    so that graph[b]=[]  
            graph[b].push(a)
2. Calculate the indegree using the numCourses using the adjacency list created above
3. Do a topologicalSort of the graph using inDegree

O(P+N)  where P is the count of prerequisites and N is numCourses.
*/

function canFinish(numCourses, prerequisites) {
    let adjList = new Map();
    let inDegree = new Map();

    // Initialize in-degree map with all courses set to 0
    for (let i = 0; i < numCourses; i++) {
        inDegree.set(i, 0);
    }

    // Build adjacency list and in-degree map
    for (let [course, prereq] of prerequisites) {
        if (!adjList.has(prereq)){
            adjList.set(prereq, []);
        } 
        adjList.get(prereq).push(course);
        
        // Increase in-degree count
        inDegree.set(course, (inDegree.get(course) || 0) + 1);
    }

    // Find all courses with no prerequisites (in-degree = 0)
    let queue = [];
    for (let [course, count] of inDegree) {
        if (count === 0) queue.push(course);
    }

    let completedCourses = 0;

    // Process the queue (BFS)
    while (queue.length > 0) {
        let course = queue.shift(); // Take a course with 0 prerequisites
        completedCourses++; //this is key

        if (adjList.has(course)) {
            for (let nextCourse of adjList.get(course)) {
                inDegree.set(nextCourse, inDegree.get(nextCourse) - 1); // Reduce in-degree
                
                if (inDegree.get(nextCourse) === 0) {
                    queue.push(nextCourse); // Add to queue if no remaining prerequisites
                }
            }
        }
    }

    return completedCourses === numCourses; // If all courses are completed, return true
}

// Example Usage
console.log(canFinish(2, [[1, 0]])); // true
console.log(canFinish(2, [[1, 0], [0, 1]])); // false (cycle)
console.log(canFinish(3, [[1, 0], [2, 1]])); // true
