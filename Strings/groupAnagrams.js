/** 🔹 Problem: Given a list of words, group anagrams together.
🔹 Example: ["eat", "tea", "tan"] → [["eat","tea"],["tan"]]

LOGIC
1. Sort each word and use it as a hashmap key.
2. Store all anagrams in hashmap buckets.

*The logic for finding if two words are anagrams is to sort them and compare, they should be equal.

*/

function groupAnagrams(words) {
    let map = new Map();

    for (let word of words) {
        //turn each word into an array and sort it and put it back together.
        let sorted = word.split('').sort().join('');
        if (!map.has(sorted)) map.set(sorted, []);
        //else
        map.get(sorted).push(word);
    }

    return Array.from(map.values()); //finally create an array out of the values of the anagrams
}

// Test
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// Output: [["eat","tea","ate"],["tan","nat"],["bat"]]
