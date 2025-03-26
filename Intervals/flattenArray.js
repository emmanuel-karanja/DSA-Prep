// Example Usage
let schedules = [
    [[1, 3], [6, 7]],
    [[2, 4]],
    [[2, 5], [9, 12]]
];

const flattened=schedules.reduce((acc,curr)=>acc.concat(curr),[]);

console.log("hardway",flattened)

console.log("easyway",schedules.flat())