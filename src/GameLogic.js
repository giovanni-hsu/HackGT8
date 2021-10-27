/**Types of blocks: "air"; "stone"; "water"; "fixw"; "bucket"; "obsi"
 * 0 Air
 * 1 Stone
 * 2 Water
 * 3 Fixed water
 */

/** Function takes in grid, coordinates and type of block to be placed
 * returns boolean representing success / failure
 */
import Block from './WaterLogic.js';

class GameGrid {

    constructor(size) {
        this.size = size;
        this.grid = this.intializeGrid(size);
        this.bucketGrid = null;
        this.numToIcon = {"air":" ", "stone":"#", "water":"o", "fixw":"o"};
        this.notupdated = false;
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
        let numSources = Math.floor(Math.random() * (size+1));
        let numBucks = Math.floor(Math.random() * (size+1));
        let placed = 0;
        var sourceArray = new Array(size);
        var buckArray = new Array(size);
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
            if (sourceArray[randEntry].blockType !== "bucket") {
                sourceArray[randEntry].blockType = new Block("bucket");
                placed++;
            }
        }
        return this.initBucketGrid(size, sourceArray, buckArray);
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
                this.bucketGrid[0][i] = "obsidian";
            }
        }
        for (let exit in exitArray) {
            //console.log(exitArray[exit]);
            this.bucketGrid[1][exitArray[exit]] = "bucket";
        }
        for (let i = 0; i < this.bucketGrid[1].length; i++) {
            if (this.bucketGrid[1][i] !== "bucket") {
                this.bucketGrid[1][i] = "obsidian";
            }
        }
        console.log('bucket grid', this.bucketGrid);
    }
    /** Function returns boolean if block above bucket has water, representing win
    */
    checkForWin(grid, bucketGrid) {
        let bucketLoc
        console.log(bucketGrid);
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
//test code 1 start
let game = new GameGrid(8);
game.placeBlock(4, 3, 'stone');

export default GameGrid;