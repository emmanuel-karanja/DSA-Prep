function testThis(str){
    const freqMap=new Map();
    const result=[];

    for(let char of str){
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }
 
    console.log(freqMap)
    for(let [key,value] of freqMap.entries()){
        result.push([key,value])
    }

    return result;
}

const test="aaaabbbbccaa"
console.log(testThis(test))
