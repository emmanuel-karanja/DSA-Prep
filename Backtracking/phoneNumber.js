/*#*/
/**
 * Problem Statement:
 * -----------------
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations 
 * that the number could represent, based on the mapping of digits to letters on a phone keypad.
 * 
 * Example:
 * ----------
 * Input: digits = "23"
 * Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * 
 * Input: digits = ""
 * Output: []
 * 
 * Input: digits = "2"
 * Output: ["a","b","c"]
 * 
 * Intuition:
 * ----------
 * 1. Use backtracking to explore all combinations.
 * 2. Map each digit to its corresponding letters.
 * 3. Recursively build combinations by appending letters for each digit.
 * 4. Once the path length equals the input digits length, store the combination.
 */

function letterCombinations(digits) {
    if (!digits) return []; // No digits -> return empty array

    // Mapping from digit to letters
    const map = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz"
    };

    const res = [];

    // Backtracking helper function
    const backtrack = (idx, path) => {
        if (path.length === digits.length) { // Completed a combination
            res.push(path);
            return;
        }

        // Explore all letters for the current digit
        for (const c of map[digits[idx]]) {
            backtrack(idx + 1, path + c);
        }
    };

    backtrack(0, ""); // Start backtracking from index 0
    return res;
}

// Driver code to test letterCombinations
const testCases = [
    { digits: "23", expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"] },
    { digits: "", expected: [] },
    { digits: "2", expected: ["a","b","c"] }
];

testCases.forEach(({digits, expected}, i) => {
    const result = letterCombinations(digits);
    console.log(`Test Case ${i + 1}: Input = "${digits}", Output = [${result}]`);
});
