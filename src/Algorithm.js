export function process(waterStatusArray, blockArray) {
	var newWaterStatusArray = new Array(blockArray.length);
    var intermWaterStatusArray = JSON.parse(JSON.stringify(waterStatusArray));
	var change = true;
	while (change) {
		change = false;
		for (let index = 0; index < blockArray.length; index++) {
			if (intermWaterStatusArray[index] === 0 && index - 1 !== -1 && intermWaterStatusArray[index-1] === 1 && blockArray[index-1] === 1) {
				intermWaterStatusArray[index] = 1;
				change = true;
			}
			if (intermWaterStatusArray[index] === 0 && index + 1 !== blockArray.length && intermWaterStatusArray[index+1] === 1 && blockArray[index+1] === 1) {
				intermWaterStatusArray[index] = 1;
				change = true;
			}
		}
	}
	for (let indexx = 0; indexx < blockArray.length; indexx++) {
		if (blockArray[indexx] === 0 && intermWaterStatusArray[indexx] === 1) {
			newWaterStatusArray[indexx] = 1;
		} else {
			newWaterStatusArray[indexx] = 0;
		}
	}
	return newWaterStatusArray;
}
export function hash(array) {
    var num = 0;
    for (let i = 0; i < 8; i++) {
        num += (2**i)*(array[i]);
    }
    return num;
}
//console.log(hash([1,0,0,0,1,0,1,1]));
/**console.log(process(
    [0,1,0,0,0,1,0,0],
    [0,1,0,0,0,1,1,0]
    ))
*/
export function plusOne(array) {
    array[0] += 1;
    array[8] += 1;
    var i = 0;
    while(array[i]===2) {
        if(i===7) {
            return false;
            console.log("77777777");
        }
        array[i] = 0;
        i += 1;
        array[i] += 1;
        array[8] -= 1;
    }
    return true;
}
export function cntNumOnes(array) {
    var cnt = 0;
    for(var i=0; i<8; i++) {
        cnt += array[i];
    }
    return cnt;
}
export function cntNumBucks(array) {
    var numBuckets = 0;
    for(var i=0; i<8; i++) if (array[i] === "bucket") numBuckets += 1;
    return numBuckets;
}
export function arrayIsSame(a, b) {
    for(var i=0; i<8; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
export function isZero(a) {
    for(var i=0; i<8; i++) {
        if (a[i] !== 0) return false;
    }
    return true;
}
export function numberize(bucketArray) {
    var array = new Array(8);
    for(var i=0; i<8; i++) {
        if (bucketArray[i] === "bucket") array[i] = 1;
        else array[i] = 0;
    }
    return array;
}
console.log(findSolution([["bucket",null,null,null,null,null,null,null]
                        ,["bucket",null,"bucket","bucket","bucket","bucket",null,null]]))
//console.log(process([1,1,1,1,0,0,0,0], [0,0,0,0,0,0,0,0]));
//console.log(process([0,1,1,1,0,0,0,0], [0,0,0,0,0,0,0,0]));
export function findSolution(bucketGrid) {
    var waterStatusArray = numberize(bucketGrid[0]);
    var bucketGrid = JSON.parse(JSON.stringify(bucketGrid[1]));
    bucketGrid.push(cntNumBucks(bucketGrid));
    var bestScore = [0, 0];
    var score;
    var newBlockArray = [0,0,0,0,0,0,0,0,0];
    var allHashSets = [new Set(), new Set(), new Set(), new Set()];
    do {
        //console.log(newBlockArray);
        //console.log(bestScore);
        //console.log(newBlockArray)
        var totalBlocks = newBlockArray[8];
        if (bestScore[0] === bucketGrid[8] && totalBlocks >= bestScore[1]) continue;
        score = treeSearch1(waterStatusArray, newBlockArray, totalBlocks, bucketGrid, allHashSets);
        if (score[0] > bestScore[0]) {
            bestScore = score;
        } else if (score[0] === bestScore[0]) {
            if (score[1] < bestScore[1]) bestScore = score;
        }
    } while(plusOne(newBlockArray));
    var numBuckets = 0;
    for(var i=0; i<8; i++) if (bucketGrid[i] === "bucket") numBuckets += 1;
    if (numBuckets === bestScore[0]) return [true, bestScore[0], bestScore[1]];
    else return [false];
}
export function treeSearch1(waterStatusArray, blockArray, numBlocks, bucketGrid, allHashSets) {
    //console.log("1");
    var nextStatus = process(waterStatusArray, blockArray);
    var hashValue = hash(nextStatus);
    /*if (arrayIsSame(nextStatus, waterStatusArray) && !isZero(blockArray)) {
        return [0, 0];
    } else */
    if (allHashSets[0].has(hashValue)) {
        return [0, 0];
    } else {
        allHashSets[0].add(hashValue);
        var bestScore = [0, 0];
        var score;
        var newBlockArray = [0,0,0,0,0,0,0,0,0];
        do {
            //console.log(newBlockArray);
            var totalBlocks = numBlocks + newBlockArray[8];
            if (bestScore[0] === bucketGrid[8] && totalBlocks >= bestScore[1]) continue;
            score = treeSearch2(nextStatus, newBlockArray, totalBlocks, bucketGrid, allHashSets);
            if (score[0] > bestScore[0]) {
                bestScore = score;
            } else if (score[0] === bestScore[0]) {
                if (score[1] < bestScore[1]) bestScore = score;
            }
        } while(plusOne(newBlockArray));
    }
    //console.log("Best",bestScore);

    console.log("Best",bestScore);
    return bestScore;
}
export function treeSearch2(waterStatusArray, blockArray, numBlocks, bucketGrid, allHashSets) {
    //console.log("2");
    var nextStatus = process(waterStatusArray, blockArray);
    var hashValue = hash(nextStatus);
    if (allHashSets[1].has(hashValue)) {
        return [0, 0];
    } else {
        allHashSets[1].add(hashValue);
        var bestScore = [0, 0];
        var score;
        var newBlockArray = [0,0,0,0,0,0,0,0,0];
        do {
            var totalBlocks = numBlocks + newBlockArray[8];
            if (bestScore[0] === bucketGrid[8] && totalBlocks >= bestScore[1]) continue;
            score = treeSearch3(nextStatus, newBlockArray, totalBlocks, bucketGrid, allHashSets);
            //console.log("Score",score);
            if (score[0] > bestScore[0]) {
                bestScore = score;
            } else if (score[0] === bestScore[0]) {
                if (score[1] < bestScore[1]) bestScore = score;
            }
            //console.log("Best",bestScore);
        } while(plusOne(newBlockArray));
    }//console.log(bestScore);
    return bestScore;
}
export function treeSearch3(waterStatusArray, blockArray, numBlocks, bucketGrid, allHashSets) {
    //console.log("3");
    var nextStatus = process(waterStatusArray, blockArray);
    var hashValue = hash(nextStatus);
    if (allHashSets[2].has(hashValue)) {
        return [0, 0];
    } else {
        allHashSets[2].add(hashValue);
        var bestScore = [0, 0];
        var score;
        var newBlockArray = [0,0,0,0,0,0,0,0,0];
        do {
            var totalBlocks = numBlocks + newBlockArray[8];
            if (bestScore[0] === bucketGrid[8] && totalBlocks >= bestScore[1]) continue;
            score = treeSearch4(nextStatus, newBlockArray, totalBlocks, bucketGrid, allHashSets);
            /*if(score[0] === 4) {
                console.log("points: ", score[0]);
                console.log("numblocks: ", numBlocks);
                console.log("water Status: ", waterStatusArray);
                console.log("bucket:",bucketGrid[1]);
                console.log("block:",blockArray);
                console.log("next:  ", nextStatus);
                console.log("-------------------")
                sleep(10000)
            }*/
            if (score[0] > bestScore[0]) {
                bestScore = score;
            } else if (score[0] === bestScore[0]) {
                if (score[1] < bestScore[1]) bestScore = score;
            }
        } while(plusOne(newBlockArray));
    }
    return bestScore;
}
export function treeSearch4(waterStatusArray, blockArray, numBlocks, bucketGrid, allHashSets) {
    //console.log("4");
    var nextStatus = process(waterStatusArray, blockArray);
    var hashValue = hash(nextStatus);
    var points = 0;
    if (allHashSets[3].has(hashValue)) {
        return [0, 0];
    } 
    allHashSets[3].add(hashValue);
    //if (arrayHashSet.size!=0)
    //console.log(arrayHashSet.size);

    //console.log("bucket:" ,bucketGrid);
    for(var i=0; i<8; i++) {
        if (bucketGrid[i] === "bucket" && nextStatus[i] === 1) points += 1;
    }

    //console.log("points:" ,points);
    return [points, numBlocks];
}
export function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
} 