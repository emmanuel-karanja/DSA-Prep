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

*/

function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
  
    const queue = [[beginWord, 1]];
  
    while (queue.length > 0) {
      const [word, level] = queue.shift();
  
      for (let i = 0; i < word.length; i++) {
        for (let c = 97; c <= 122; c++) {
          const nextWord =
            word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
          if (nextWord === endWord) return level + 1;
  
          if (wordSet.has(nextWord)) {
            queue.push([nextWord, level + 1]);
            wordSet.delete(nextWord); // mark as visited
          }
        }
      }
    }
  
    return 0;
  }
  