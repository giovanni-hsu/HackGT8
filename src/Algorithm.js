function process(waterStatusArray, blockArray) {
	var newWaterStatusArray = new Array(waterStatusArray.length);
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
/**console.log(process(
    [0,1,0,0,0,1,0,0],
    [0,1,0,0,0,1,1,0]
    ))
*/
function plusOne(array) {
    array[0] += 1;
    var i = 0;
    while(array[i]===2) {
        if(i===7) {
            return false;
            console.log("77777777");
        }
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
//console.log(findSolution([1,1,1,1,0,0,0,0], [[],[null,null,"buck","buck","buck","buck",null,null]]))
function findSolution(waterStatusArray, bucketGrid) {
    var bestScore = [0, 0];
    var score;
    var newBlockArray = [0,0,0,0,0,0,0,0];
    do {
        //console.log(newBlockArray);
        //console.log(bestScore);
        console.log("Best",bestScore);
        var totalBlocks = cntNumOnes(newBlockArray);
        if (bestScore[0] !== 0 && totalBlocks > bestScore[0]) continue;
        score = treeSearch1(waterStatusArray, newBlockArray, totalBlocks, bucketGrid);
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
    //console.log("1");
    var nextStatus = process(waterStatusArray, blockArray);

    if (arrayIsSame(nextStatus, waterStatusArray) && !isZero(blockArray)) {
        return [0, 0];
    } else {
        var bestScore = [0, 0];
        var score;
        var newBlockArray = [0,0,0,0,0,0,0,0];
        do {
            //console.log(newBlockArray);
            var totalBlocks = numBlocks + cntNumOnes(newBlockArray);
            if (bestScore[0] !== 0 && totalBlocks > bestScore[0]) continue;
            score = treeSearch2(nextStatus, newBlockArray, totalBlocks, bucketGrid);
            if (score[0] > bestScore[0]) {
                bestScore = score;
            } else if (score[0] === bestScore[0]) {
                if (score[1] < bestScore[1]) bestScore = score;
            }
        } while(plusOne(newBlockArray));
    }
    //console.log("Best",bestScore);
    return bestScore;
}
function treeSearch2(waterStatusArray, blockArray, numBlocks, bucketGrid) {
    //console.log("2");
    var nextStatus = process(waterStatusArray, blockArray);
    if (arrayIsSame(nextStatus, waterStatusArray) && !isZero(blockArray)) {
        return [0, 0];
    } else {
        var bestScore = [0, 0];
        var score;
        var newBlockArray = [0,0,0,0,0,0,0,0];
        do {
            var totalBlocks = numBlocks + cntNumOnes(newBlockArray);
            if (bestScore[0] !== 0 && totalBlocks > bestScore[0]) continue;
            score = treeSearch3(nextStatus, newBlockArray, totalBlocks, bucketGrid);
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
function treeSearch3(waterStatusArray, blockArray, numBlocks, bucketGrid) {
    //console.log("3");
    var nextStatus = process(waterStatusArray, blockArray);
    if (arrayIsSame(nextStatus, waterStatusArray) && !isZero(blockArray)) {
        return [0, 0];
    } else {
        var bestScore = [0, 0];
        var score;
        var newBlockArray = [0,0,0,0,0,0,0,0];
        do {
            var totalBlocks = numBlocks + cntNumOnes(newBlockArray);
            if (bestScore[0] !== 0 && totalBlocks > bestScore[0]) continue;
            score = treeSearch4(nextStatus, newBlockArray, totalBlocks, bucketGrid);
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
    //console.log("4");
    var nextStatus = process(waterStatusArray, blockArray);
    var points = 0;
    //console.log("nextstatus:" ,nextStatus);

    //console.log("bucket:" ,bucketGrid);
    for(var i=0; i<8; i++) {
        if (bucketGrid[1][i] === "buck" && nextStatus[i] === 1) points += 1;
    }
    //console.log("points:" ,points);
    return [points, numBlocks];
}