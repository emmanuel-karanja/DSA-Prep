/**You are given an array representing the value of what a robber would get from a house that are in  arow,
 * A robber can either rob the current house and not rob the previous house because an alarm will go off,
 * find the maximum value that a robber can rob.
 */

function robber(loot=[]){
    if(loot.length===0) return 0;
    if(loot.length===1) return loot[0];

    const ROB=[];
    ROB[0]=loot[0];
    ROB[1]=Math.max(ROB[0],loot[1]);

    for(let i=2;i<loot.length;i++){
        //a robber can either rob the current house and the one two steps before or rob the previous one.
        ROB[i]=Math.max(ROB[i-1],loot[i]+ROB[i-2])
    }

    return ROB[ROB.length-1]
}


//To make space O(1)
function robberImprovement(loot = []) {
    if (loot.length === 0) return 0;
    if (loot.length === 1) return loot[0];

    let prev2 = loot[0];
    let prev1 = Math.max(loot[0], loot[1]);

    for (let i = 2; i < loot.length; i++) {
        const current = Math.max(prev1, loot[i] + prev2);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

/**CIRCULAR: In the linear version, we consider the whole array.

In the circular version, if you rob the first, you can’t rob the last, and vice versa.

So we have to split the problem.

We solve two subproblems:

Rob from house 0 to n - 2 (skip last house)
Rob from house 1 to n - 1 (skip first house)
Then return the max of both.

 */

function robCircle(nums = []) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
   
     //this is the only change
    return Math.max(
        robLinear(nums.slice(0, nums.length - 1)),
        robLinear(nums.slice(1))
    );
}

function robLinear(loot) {
    let prev2 = 0, prev1 = 0;

    for (let amount of loot) {
        const current = Math.max(prev1, amount + prev2);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}
