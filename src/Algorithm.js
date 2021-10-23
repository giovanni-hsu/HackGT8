function process(waterStatusArray, blockArray) {
	var newWaterStatusArray = new Array(waterStatusArray.length);
	var change = true;
	while (change) {
		change = false;
		for (let index = 0; index < blockArray.length; index++) {
			if (waterStatusArray[index] === 0 && index - 1 !== -1 && waterStatusArray[index-1] === 1 && blockArray[index-1] === 1) {
				waterStatusArray[index] = 1;
				change = true;
			}
			if (waterStatusArray[index] === 0 && index + 1 !== blockArray.length && waterStatusArray[index+1] === 1 && blockArray[index+1] === 1) {
				waterStatusArray[index] = 1;
				change = true;
			}
		}
	}
	for (let indexx = 0; indexx < blockArray.length; indexx++) {
		if (blockArray[indexx] === 0 && waterStatusArray[indexx] === 1) {
			newWaterStatusArray[indexx] = 1;
		} else {
			newWaterStatusArray[indexx] = 0;
		}
	}
	return newWaterStatusArray;
}
function plusOne(array) {
    array[0] += 1;
    var i = 0;
    while(array[i]===2) {
        if(i===7) return false;
        array[i] = 0;
        i += 1;
        array[i] += 1;
    }
    return true;
}
function cntNumOnes(array) {
    var cnt = 0;
    for(var i=0; i<8; i++) {
        cnt += array[i];
    }
    return cnt;
}
function arrayIsSame(a, b) {
    for(var i=0; i<8; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
function isZero(a) {
    for(var i=0; i<8; i++) {
        if (a[i] !== 0) return false;
    }
    return true;
}
function findSolution(waterStatusArray, bucketGrid) {
    bestScore = [0, 0];
    var score;
    var newBlockArray = [0,0,0,0,0,0,0,0];
    do {
        score = treeSearch1(waterStatusArray, newBlockArray, cntNumOnes(newBlockArray), bucketGrid);
        if (score[0] > bestScore[0]) {
            bestScore = score;
        } else if (score[0] === bestScore[0]) {
            if (score[1] < bestScore[1]) bestScore = score;
        }
    } while(plusOne(newBlockArray));
    var numBuckets = 0;
    for(var i=0; i<8; i++) if (bucketGrid[1][i] === "buck") numBuckets += 1;
    if (numBuckets === bestScore[0]) return [true, bestScore[0], bestScore[1]];
    else return [false];
}

function treeSearch1(waterStatusArray, blockArray, numBlocks, bucketGrid) {
    var nextStatus = process(waterStatusArray, blockArray);
    if (arrayIsSame(nextStatus, waterStatusArray) && !isZero(blockArray)) {
        return [0, 0];
    } else {
        bestScore = [0, 0];
        var score;
        var newBlockArray = [0,0,0,0,0,0,0,0];
        do {
            score = treeSearch2(nextStatus, newBlockArray, cntNumOnes(newBlockArray) + numBlocks, bucketGrid);
            if (score[0] > bestScore[0]) {
                bestScore = score;
            } else if (score[0] === bestScore[0]) {
                if (score[1] < bestScore[1]) bestScore = score;
            }
        } while(plusOne(newBlockArray));
    }
    return bestScore;
}
function treeSearch2(waterStatusArray, blockArray, numBlocks, bucketGrid) {
    var nextStatus = process(waterStatusArray, blockArray);
    if (arrayIsSame(nextStatus, waterStatusArray) && !isZero(blockArray)) {
        return [0, 0];
    } else {
        bestScore = [0, 0];
        var score;
        var newBlockArray = [0,0,0,0,0,0,0,0];
        do {
            score = treeSearch2(nextStatus, newBlockArray, cntNumOnes(newBlockArray) + numBlocks, bucketGrid);
            if (score[0] > bestScore[0]) {
                bestScore = score;
            } else if (score[0] === bestScore[0]) {
                if (score[1] < bestScore[1]) bestScore = score;
            }
        } while(plusOne(newBlockArray));
    }
    return bestScore;
}
function treeSearch3(waterStatusArray, blockArray, numBlocks, bucketGrid) {
    var nextStatus = process(waterStatusArray, blockArray);
    if (arrayIsSame(nextStatus, waterStatusArray) && !isZero(blockArray)) {
        return [0, 0];
    } else {
        bestScore = [0, 0];
        var score;
        var newBlockArray = [0,0,0,0,0,0,0,0];
        do {
            score = treeSearch2(nextStatus, newBlockArray, cntNumOnes(newBlockArray) + numBlocks, bucketGrid);
            if (score[0] > bestScore[0]) {
                bestScore = score;
            } else if (score[0] === bestScore[0]) {
                if (score[1] < bestScore[1]) bestScore = score;
            }
        } while(plusOne(newBlockArray));
    }
    return bestScore;
}
function treeSearch4(waterStatusArray, blockArray, numBlocks, bucketGrid) {
    var nextStatus = process(waterStatusArray, blockArray);
    var points = 0;
    for(var i=0; i<8; i++) {
        if (bucketGrid[1][i] === "buck" && nextStatus[i] === 1) points += 1;
    }
    return [points, numBlocks];
}