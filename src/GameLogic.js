/**Types of blocks: "air"; "stone"; "water"; "fixw"; "buck"; "obsi"
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
    }

    getSize() {
        return this.size;
    }

    placeBlock(x, y, type) {
        if (this.grid[y][x] === "air") {
            this.grid[y][x] = type;
            return true;
        } else {
            return false;
        }
    }

    /** Function takes in grid and replaces water blocks with air blocks
     */
    resetGrid() {
        for (let x = 0; x <  this.grid.length; x++) {
            for (let y = 0; y <  this.grid.length; y++) {
                if ( this.grid[y][x] === "water" || this.grid[y][x] === "fixw") {
                     this.grid[y][x] = "air";
                }
            }
        }
    }

    intializeGrid() {
        var grid = new Array(this.size);
        for (var i = 0; i < this.size; i++) {
            grid[i] = new Array(this.size);
            for(var j=0; j<this.size; j++) {
                grid[i][j] = "air";
            }
        }
        return grid;
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
                this.bucketGrid[i][j] = "air";
            }
        }
        for (let source in sourceArray) {
            this.bucketGrid[0][source] = "water";
        }
        for (let exit in exitArray) {
            this.bucketGrid[1][exit] = "buck";
        }
    }
    /** Function returns boolean if block above bucket has water, representing win
    */
    checkForWin(grid, bucketGrid) {
        let bucketLoc
        console.log(bucketGrid);
        for (let i = 0; i < bucketGrid[1].length; i++) {
            if (i === "buck") {
                bucketLoc = i;
            }
        }
        let previousBlock = grid[grid.length-1][bucketLoc];
        if (previousBlock === "water" || previousBlock == "fixw") {
            return true;
        }
        return false;
    }


    printGrid() {
        process.stdout.write("----------------\n");
        for(var i=0; i< this.grid.length; i++) {
            for(var j=0; j< this.grid[i].length; j++) {
                process.stdout.write(this.numToIcon[this.grid[i][j]] + " ");
            }
            process.stdout.write("|\n");
        }
        process.stdout.write("----------------\n");
    }

    updateGrid() {
        for(var i=0; i< this.grid.length-1; i++) {
            for(var j=0; j< this.grid[i].length; j++) {
                if ( this.grid[i][j] === "water") {
                    if ( this.grid[i+1][j] === "air") {
                         this.grid[i+1][j] = 4;
                    } else if ( this.grid[i+1][j] === "stone") {
                        if ( this.grid[i][j-1] === "air")  this.grid[i][j-1] = 4;
                        if ( this.grid[i][j+1] === "air")  this.grid[i][j+1] = 4;
                    }
                    this.grid[i][j] = "fixw";
                }
            }
        }
        for(i=0; i< this.grid.length; i++) {
            for(j=0; j< this.grid[i].length; j++) {
                if ( this.grid[i][j] === 4)  this.grid[i][j] = "water";
            }
        }
        
    }
    // updateBlock(x, y) {
    //     if (this.grid[x][y] != "water")
    // }

//shouldnt this be grid[y][x]?
    placeWater(x, y) {
         this.grid[y][x] = "water";
    }
    // test code end

    done() { //check sides, check split paths
        for (let i = 0; i <  this.grid[0].length; i++) {
            if ( this.grid[this.grid.length-1][i] === "water" ||  this.grid[this.grid.length-1][i] === "fixw") {
                return true
            }
        }
        return false
    }

    placeBlock(x, y, material) {
        this.grid[y][x] = material;
    }
    getIndex(x, y) {
        return (
          this.grid[y][x]
        )
      }
}

export default GameGrid