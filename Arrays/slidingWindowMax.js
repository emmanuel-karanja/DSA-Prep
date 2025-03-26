/**You are given an array nums and an integer k.
Return an array of the maximums of each sliding window of size k as it moves across nums.

LOGIC:

It sounds like you'll use two pointers, left and right, and set right=k

loop while right < arr.length

find the max in the window and add it to the result

THAT'S THE LOGIC for Brute force which is Time O(n*k)
*/

function findMax(arr=[],left,right){
    let max=arr[left];
    while(left < right){
        if(arr[left]>max){
            max=arr[left]
        }
        left++
    }
    return max;
}

function findWindowMax(nums=[],k){
    let left=0;
    let right=k;
    let result=[]
    while(right <= nums.length){
        let localMax=findMax(nums,left,right)
        result.push(localMax)
        left++;
        right++;
    }

    return result;
}

const nums = [1,3,-1,-3,5,3,6,7], k = 3

console.log(findWindowMax(nums,k))

/**We use a deque (double-ended queue) to store indices, not actual values.

🧠 What does the deque do?
It keeps track of potential maximums for the current window.
The front of the deque always holds the index of the maximum element in the current window.
We remove useless elements as we go to maintain only strong candidates for max.

MY LOGIC(which is correct and which Deque automates)
Think of the deque as tube that slides along the array i.e. elements exit from the left,
and enter from the right

Further, if the element entering is greater than the max of the tube, we remove all of them, they are
now useless to us.

i.e. We can calculate the first window from 0 to k, and keep track of the max and its index. As we slide
the 'smart tube' along the array, we check if the new element entering is greater or equal to max and update
max and its index, and also check if the current max is leaving the tube and recalculate the whole thing again.
It sits between the Brute Force and Optimized Version but still degenerates to O(n*k)

EXPLAINER

In the sliding window max problem, we want to:

1. Always know the max value in the current window
2. Keep track of possible future max candidates as the window slides

The Core Idea:

If nums[i] is greater than any of the elements at the back of the deque,
then those elements are useless going forward — they can never be the max again.

Why? Because:

1. They’re smaller than nums[i]
2. And they’ll leave the window before nums[i] does


FINALLY

We iterate over the array and:

1. First remove elements out of the window bound i.e. deque[0] <=i-k
2. Remove all indices of elements less than currentElement (a loop)
3. Push the current element
4. Push results if we have arrived at window i.e. i>=k-1
 */

function maxSlidingWindow(nums, k) {
    const deque = [];  // will store indices
    const result = [];

    for (let i = 0; i < nums.length; i++) {

        // Remove elements outside the window.
        // i-k is the index of the element that just slid out, the current deque[0] is i-k+1
        //At index i, the window contains indices [i - k + 1, i]. 
        if (deque.length && deque[0] <= i - k) {
            deque.shift();
        }

        // Remove smaller elements from back, this is the same logic as a monotonic stack
        while (deque.length && nums[i] > nums[deque[deque.length - 1]]) {
            //remove all elements currenyl less than nums[i]
            deque.pop();
        }

        //if nums[i] we add it to the deque either we've emptied the deque or we find one smaller
        deque.push(i);

        //when we've a window sized k, push the results at the first position i.e. the max
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}


console.log(maxSlidingWindow(nums,k))
