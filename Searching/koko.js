/**Koko loves to eat bananas. She has piles of bananas where piles[i] represents the number of bananas in the ith pile.
She can decide her eating speed k (bananas/hour), but she only eats from one pile per hour, choosing the pile with
 bananas remaining.
Return the minimum integer k such that she can eat all the bananas within h hours. */

function minEatingSpeed(piles, h) {
    let left = 1;
    let right = Math.max(...piles);

    function canEatAll(speed) {
        let hours = 0;
        for (let pile of piles) {
            hours += Math.ceil(pile / speed);
        }
        return hours <= h;
    }

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canEatAll(mid)) {
            right = mid; // try a smaller k
        } else {
            left = mid + 1; // need a bigger k
        }
    }

    return left; // the minimum speed that works
}


const piles = [3, 6, 7, 11];
const h = 8;
console.log(minEatingSpeed(piles, h)); // Output: 4
