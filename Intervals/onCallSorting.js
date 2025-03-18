/**The point of this particular piece of code was to be able to know how to handle this. */

// Original on-call schedules
const schedules = {
    Person: [[1, 2], [5, 6]],
    Person1: [[3, 4]],
    Person2: [[7, 8], [9, 10]]
  };
  
  // Function to process the schedules and create the desired format
  function processSchedules(schedules) {
    let result = [];
  
    // Loop through each owner and their respective on-call schedules
    for (let owner in schedules) {
      schedules[owner].forEach(onCall => {
        result.push({
          owner: owner,
          onCall: onCall
        });
      });
    }

    
    // Optional: Sort the result by the first element of the on-call array (start time)
    result = result.sort((a, b) => {
      const [aStart] = a.onCall;
      const [bStart] = b.onCall;
      return aStart - bStart; // Ascending order based on start time
    });
  
    return result;
  }
  
  // Driver code
  const processedSchedules = processSchedules(schedules);
  
  // Output the processed and sorted schedules
  console.log("Processed On-Call Schedules:");
  console.log(processedSchedules);
  
  // For demonstration, printing in a user-friendly format
  processedSchedules.forEach(schedule => {
    console.log(`${schedule.owner} is on-call from ${schedule.onCall[0]} to ${schedule.onCall[1]}`);
  });
  