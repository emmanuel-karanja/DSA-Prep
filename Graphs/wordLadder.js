/**You are given:

A beginWord (start word)
An endWord (target word)
A wordList (dictionary of allowed words)
Each step, you can only change one letter, and the resulting word must be in the word list.

🔍 Goal:
Return the minimum number of steps to transform beginWord into endWord.
If it’s not possible, return 0.

Each transformation must be a valid word in the dictionary.

Key Insight
Each word is a node, and an edge exists if two words differ by exactly one letter.

That turns the problem into a shortest path in an unweighted graph, which can be solved using BFS.

Time O(N*L) where L is the letter count per word and N is the dictionary size. 
*/

function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
  
    const visited = new Set();
    const queue = [[beginWord, 1]]; //level begins at 1.
    visited.add(beginWord);
  
    const aChar = 'a'.charCodeAt(0);
    const zChar = 'z'.charCodeAt(0);
  
    while (queue.length > 0) {
      const [word, level] = queue.shift();
  
      for (let i = 0; i < word.length; i++) {
        for (let c = aChar; c <= zChar; c++) {
            //test out word formed by iterating chars from 'a' to 'z'. Generate a new word by changing a character
            //at every position of the word
          const nextWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
  
          //early return, we've reached the end and we return
          if (nextWord === endWord) return level + 1;
  
          if (wordSet.has(nextWord) && !visited.has(nextWord)) {
            visited.add(nextWord);
            queue.push([nextWord, level + 1]);
          }
        }
      }
    }
  
    return 0;
  }
  
  /**OBSERVATIONS:
   * 
   * 1.WordLadder===BFS with node=[word,level]
   * 2.Hardest part is in knowing how to form the nextWord, the other instructions are 
   *   explicit in the question's ask.
   */
  