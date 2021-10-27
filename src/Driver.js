/**Types of blocks: "air"; "stone"; "water"; "fixw"; "bucket"; "obsi"
 * 0 Air
 * 1 Stone
 * 2 Water
 * 3 Fixed water
 */

/** Function takes in grid, coordinates and type of block to be placed
 * returns boolean representing success / failure
 */

class GameGrid {

    constructor(size) {
        this.size = size;
        this.grid = this.intializeGrid(size);
        this.bucketGrid = null;
        this.numToIcon = {"air":" ", "stone":"#", "water":"o", "fixw":"o"};
        this.notupdated = false;
        this.minBlocks = 8;
    }

    getSize() {
        return this.size;
    }

    placeBlock(x, y, type) {
       if (this.grid[y][x].blockType === "air") {
            this.grid[y][x] = new Block(type);
            return true;
        } else {
            return false;
        }
    }

    /** Function takes in grid and replaces water blocks with air blocks
     */
    resetGrid() {
        for (let y = 0; y <  this.grid.length; y++) {
            for (let x = 0; x <  this.grid.length; x++) {
                if ( this.grid[y][x].blockType === "water" || this.grid[y][x].blockType === "fixw" || this.grid[y][x].blockType === "stone") {
                     this.grid[y][x].blockType = "air";
                }
            }
        }
    }

    nextGrid() {
        this.resetGrid();
        var results = new Array();
        do {
            this.bucketGrid = this.generateRandBuckGrid(this.size);
            results = findSolution([this.bucketGrid[1],this.bucketGrid[2]]);
            console.log(results[0]);
        } while (!results[0]);
        this.minBlocks = results[2];
    }

    intializeGrid() {
        var grid = new Array(this.size);
        for (var i = 0; i < this.size; i++) {
            grid[i] = new Array(this.size);
            for(var j=0; j<this.size; j++) {
                grid[i][j] = new Block("air");
            }
        }
        return grid;
    }
    generateRandBuckGrid(size) {
        let numSources = Math.floor(Math.random() * (size) + 1);
        console.log("numSources " + numSources);
        let numBucks = Math.floor(Math.random() * (size) + 1);
        console.log("numBucks " + numBucks);

        let placed = 0;
        var sourceArray = new Array(size);
        sourceArray.fill(new Block("air"));
        var buckArray = new Array(size);
        buckArray.fill(new Block("air"));
        let randEntry;
        while (placed < numSources) {
            randEntry = Math.floor(Math.random() * size);
            if (sourceArray[randEntry].blockType !== "bucket") {
                sourceArray[randEntry] = new Block("bucket");
                placed++;
            }
        }
        placed = 0;
        while (placed < numBucks) {
            randEntry = Math.floor(Math.random() * size);
            if (buckArray[randEntry].blockType !== "bucket") {
                buckArray[randEntry] = new Block("bucket");
                placed++;
            }
        }
        //console.log([sourceArray, buckArray]);
        return [sourceArray, buckArray];
    }
    /** Function initializes bucket grid, taking in as input size of grid and source and exit points (just x coordinate)
     * for water. Places source of water and bucket on selected points, and obsidian everywhere else
     */
    initBucketGrid(size, sourceArray, exitArray) {
        const HEIGHT = 2;
        this.bucketGrid = new Array(HEIGHT);
        for (var i = 0; i < HEIGHT; i++) {
            this.bucketGrid[i] = new Array(size);
            for(var j=0; j<size; j++) {
                this.bucketGrid[i][j] = new Block("air");
            }
        }
        for (let source in sourceArray) {
            this.bucketGrid[0][sourceArray[source]] = "bucket";
        }
        for (let i = 0; i < this.bucketGrid[0].length; i++) {
            if (this.bucketGrid[0][i] !== "bucket") {
                this.bucketGrid[0][i] = "air";
            }
        }
        for (let exit in exitArray) {
            //console.log(exitArray[exit]);
            this.bucketGrid[1][exitArray[exit]] = "bucket";
        }
        for (let i = 0; i < this.bucketGrid[1].length; i++) {
            if (this.bucketGrid[1][i] !== "bucket") {
                this.bucketGrid[1][i] = "air";
            }
        }
    }
    /** Function returns boolean if block above bucket has water, representing win
    */
    checkForWin(grid, bucketGrid) {
        let bucketLoc
        for (let i = 0; i < bucketGrid[1].length; i++) {
            if (i === "bucket") {
                bucketLoc = i;
            }
        }
        let previousBlock = grid[grid.length-1][bucketLoc].blockType;
        if (previousBlock === "water" || previousBlock === "fixw") {
            return true;
        }
        return false;
    }


    printGrid() {
        if (this.notupdated) throw new Error("not updated!");
        process.stdout.write("-----------------------------\n");
        for(var i=0; i< this.grid.length; i++) {
            for(var j=0; j< this.grid[i].length; j++) {
                process.stdout.write(this.grid[i][j].print() + "  ");
            }
            process.stdout.write("|\n");
        }
        process.stdout.write("-----------------------------\n");
    }
    /*
    updateGrid() {
        for(var i=0; i< this.grid.length-1; i++) {
            for(var j=0; j< this.grid[i].length; j++) {
                if ( this.grid[i][j].blockType === "water") {
                    if ( this.grid[i+1][j].blockType === "air") {
                         this.grid[i+1][j].blockType = 4;
                    } else if ( this.grid[i+1][j].blockType === "stone") {
                        if ( this.grid[i][j-1].blockType === "air")  this.grid[i][j-1] = 4;
                        if ( this.grid[i][j+1].blockType === "air")  this.grid[i][j+1] = 4;
                    }
                    this.grid[i][j] = new Block("fixw");
                }
            }
        }
        for(i=0; i< this.grid.length; i++) {
            for(j=0; j< this.grid[i].length; j++) {
                if ( this.grid[i][j].blockType === 4)  this.grid[i][j] = new Block("water");
            }
        }
        
    }*/

    updateGrid() {
        this.updateAllNeighborBlock();
        this.updateAllBlock();
    }
    updateAllNeighborBlock() {
        for(let i=0; i< this.grid.length; i++) {
            for(let j=0; j< this.grid[i].length; j++) {
                this.updateNeighborBlock(i, j);
            }
        }
    }
    /*
    updateNeighborBlock(x, y) {
        let nowBlock = this.grid[x][y];
        if (nowBlock.blockType !== "water") return;
        if (nowBlock.downFlow) {
            if (x+1 >= this.grid.length) return; // last row
            if (x+2 >= this.grid.length || this.grid[x+2][y].blockType === "air" || this.grid[x+2][y].blockType === "water") {
                this.grid[x+1][y].initDownFlowWater();
            } else if (this.grid[x+2][y].blockType === "stone") {
                if (this.grid[x+1][y].blockType === "air") {
                    this.grid[x+1][y].initWater(7, 7);
                } else if (this.grid[x+1][y].blockType === "water") {
                    this.grid[x+1][y].heighten(7, 7);
                    //hsidofisd
                } else {
                    throw new Error("strange error 1");
                }
            } else {
                throw new Error("unknown block type");
            }
        } else {
            if (x === this.grid.length-1 || this.grid[x+1][y].blockType !== "stone")  {
                this.grid[x+1][y].initDownFlowWater();
            } else {
                if (y > 0) {
                    if (this.grid[x][y-1].blockType === "air") {
                        this.grid[x][y-1].initWater(nowBlock.waterLevel[0] - 1, nowBlock.waterLevel[0]);
                    } else {
                        this.grid[x][y-1].heighten(nowBlock.waterLevel[0] - 1, nowBlock.waterLevel[0]);
                    }
                }
                if (y < this.grid[x].length - 1) {
                    if (this.grid[x][y+1].blockType === "air") {
                        console.log(this.grid[x][y+1]);
                        console.log(this.grid[x][y+1].initWater(nowBlock.waterLevel[1], nowBlock.waterLevel[1] - 1));
                        this.grid[x][y+1].initWater(nowBlock.waterLevel[1], nowBlock.waterLevel[1] - 1);
                    } else {
                        this.grid[x][y+1].heighten(nowBlock.waterLevel[1], nowBlock.waterLevel[1] - 1);
                    }
                }
            }
            
        }
    }*/
    updateNeighborBlock(x, y) {
        let nowBlock = this.grid[x][y];
        if (x<0 || x>= this.grid.length || y<0 || y>=this.grid[0]) throw new Error("x, y not in range");
        if (nowBlock.blockType !== "water") return;


        if (x === this.grid.length-1) {
            return;
        } else if (this.grid[x+1][y].blockType !== "stone") {
            if (this.grid[x+1][y].blockType === "air") {
                this.grid[x+1][y].initWater(7, 7);
            } else if (this.grid[x+1][y].blockType === "water") {
                this.grid[x+1][y].heighten(7, 7);
                //hsidofisd
            } else {
                throw new Error("strange error 1");
            }
        } else {
            if (y > 0) {
                if (this.grid[x][y-1].blockType === "air") {
                    this.grid[x][y-1].initWater(nowBlock.waterLevel[0] - 1, nowBlock.waterLevel[0]);
                } else {
                    this.grid[x][y-1].heighten(nowBlock.waterLevel[0] - 1, nowBlock.waterLevel[0]);
                }
            }
            if (y < this.grid[x].length - 1) {
                if (this.grid[x][y+1].blockType === "air") {
                    this.grid[x][y+1].initWater(nowBlock.waterLevel[1], nowBlock.waterLevel[1] - 1);
                } else {
                    this.grid[x][y+1].heighten(nowBlock.waterLevel[1], nowBlock.waterLevel[1] - 1);
                }
            }
        }
    }
    updateAllBlock() {
        for(let i=0; i< this.grid.length; i++) {
            for(let j=0; j< this.grid[i].length; j++) {
                this.grid[i][j].update();
            }
        }
        this.notupdated = false;
    }
    

//shouldnt this be grid[y][x]?
    placeWater(x, y) {
        this.notupdated = true; //there is an issue here lol it should be y!==0 but changing it to y messes up other stuff
        if (x !== 0) throw new Error("you can only place water at top row");
        this.grid[x][y].initWater(7, 7);
        /*if (this.grid[x+1][y].blockType === "stone") {
            this.grid[x][y].initWater(7, 7);
        } else {
            this.grid[x][y].initDownFlowWater();
        }*/
    }
    // test code end

    done() { //check sides, check split paths
        for(var x=0; x< this.grid.length; x++) {
            for(var y=0; y< this.grid[x].length; y++) {
                if (this.grid[x][y].blockType !== "water") continue;
                if (x === this.grid.length-1) continue;
                if (this.grid[x+1][y].blockType === "air") return false;
                else if (this.grid[x+1][y].blockType === "stone") {
                    if (y > 0) {
                        if (this.grid[x][y-1].blockType === "air") return false
                    }
                    if (y < this.grid[x].length - 1) {
                        if (this.grid[x][y+1].blockType === "air") return false
                    }
                }
            }
        }
        return true
    }

    /*placeBlock(x, y, material) {
        this.grid[y][x] = new Block(material);
    }*/
    getIndex(x, y) {
        return (
          this.grid[y][x]
        )
    }

}

class Block {
    constructor(blockType) {
        this.blockType = blockType;
    }
    initWater(leftHeight, rightHeight) {
        this.nextWaterLevel = [leftHeight, rightHeight];
        this.waterLevel = [0, 0];
        //this.downFlow = false;

        this.updated = true
    }
    /*initDownFlowWater() {
        this.nextWaterLevel = [7, 7];
        this.waterLevel = [0, 0];
        //this.downFlow = true;

        this.updated = true
    }*/
    heighten(leftHeight, rightHeight) {
        if (this.blockType !== "water") return;
        this.nextWaterLevel[0] = Math.max(this.waterLevel[0], leftHeight, this.nextWaterLevel[0]);
        this.nextWaterLevel[1] = Math.max(this.waterLevel[1], rightHeight, this.nextWaterLevel[1]);
        this.updated = true;
    }
    update() {
        if (!this.updated) return;
        this.blockType = "water";
        this.waterLevel[0] = this.nextWaterLevel[0];
        this.waterLevel[1] = this.nextWaterLevel[1];
        this.nextWaterLevel = [0, 0];
        if (this.waterLevel[0] <= 0 && this.waterLevel[1] <= 0) {
            this.blockType = "air";
            this.waterLevel = [0, 0];
        }
        this.updated = false;
    }
    print() {
        if (this.blockType === "stone") return "##";
        if (this.blockType === "air") return "  ";
        if (this.blockType === "water") return this.waterLevel[0] + "" + this.waterLevel[1];
    }
}

function process(waterStatusArray, blockArray) {
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
function hash(array) {
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
function plusOne(array) {
    array[0] += 1;
    array[8] += 1;
    var i = 0;
    while(array[i]===2) {
        if(i===7) {
            return false;
        }
        array[i] = 0;
        i += 1;
        array[i] += 1;
        array[8] -= 1;
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
function cntNumBucks(array) {
    var numBuckets = 0;
    for(var i=0; i<8; i++) if (array[i] === "bucket") numBuckets += 1;
    return numBuckets;
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
function numberize(bucketArray) {
    var array = new Array(8);
    for(var i=0; i<8; i++) {
        if (bucketArray[i] === "bucket") array[i] = 1;
        else array[i] = 0;
    }
    return array;
}
//console.log(process([1,1,1,1,0,0,0,0], [0,0,0,0,0,0,0,0]));
//console.log(process([0,1,1,1,0,0,0,0], [0,0,0,0,0,0,0,0]));
function findSolution(bucketGrid) {
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
function treeSearch1(waterStatusArray, blockArray, numBlocks, bucketGrid, allHashSets) {
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

    return bestScore;
}
function treeSearch2(waterStatusArray, blockArray, numBlocks, bucketGrid, allHashSets) {
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
function treeSearch3(waterStatusArray, blockArray, numBlocks, bucketGrid, allHashSets) {
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
function treeSearch4(waterStatusArray, blockArray, numBlocks, bucketGrid, allHashSets) {
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
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
} 

var grid = new GameGrid(8);
grid.nextGrid();

grid.printGrid();