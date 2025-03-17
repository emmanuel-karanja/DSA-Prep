/**Given an array representing unique elements, find the permutations
 * 
 * BACKTRACKING LOGIC:
 * 
 * There is a general formulae for backtracking driven by the fact that what we are really
 * doing is making a selection from a number of choices.
 * 
 * 1. Start with a candidate.
 * 2. Test the candidate for satisfying the end goal. If it does, add it to the result.
 * 3. For a given choice from choices, validate the choice.
 * 4. If the choice is valid, then add it to the candidate.
 * 5. Backtrack i.e. to invoke the results test.
 * 6. unchoose the choice.
 * 
 * 
 * Think of bactracking as a way to building a choice tree, and backtracking is moving back
 * towards the root of the current node candidate i.e. unchoosing a choice.
 * 
 */

function permutations(choices=[]){
    const result=[];

    function backtrack(choices, candidate){
        //evaluate to determine if the current candidate is a valid result
        if(candidate.length ===choices.length){
            result.push([...candidate]); //force a deep copy of the candadate
            return;
        } //else

        for(let choice of choices){
            //validate choice
            if(!candidate.includes(choice)){
                //in a permutation, we can't have repeating elements
                candidate.push(choice); //choose
                backtrack(choices,candidate)
                candidate.pop(); //unchoose
            }
        }
    }

    backtrack(choices,[]); //start with an empty one
    return result;
}

const test=["a","b","c"]

console.log(permutations(test))