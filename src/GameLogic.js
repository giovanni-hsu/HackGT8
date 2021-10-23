/**Types of blocks:
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
        this.numToIcon = {0:" ", 1:"#", 2:"o", 3:"o"};
    }

    placeBlock(x, y, type) {
        if (this.grid[x][y] === 0) {
            this.grid[x][y] = type;
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
                if ( this.grid[x][y] === 2) {
                     this.grid[x][y] = 0;
                }
            }
        }
    }

    intializeGrid() {
        var grid = new Array(this.size);
        for (var i = 0; i < this.size; i++) {
            grid[i] = new Array(this.size);
            for(var j=0; j<this.size; j++) {
                grid[i][j] = 0;
            }
        }
        return grid;
    }

    /** Function initializes bucket grid, taking in as input size of grid and source and exit points (just x coordinate)
     * for water. Places source of water and bucket on selected points, and obsidian everywhere else
     */
    initBucketGrid(size, source, exit) {
        const HEIGHT = 2;
        var grid = new Array(HEIGHT);
        for (var i = 0; i < HEIGHT; i++) {
            grid[i] = new Array(size);
            for(var j=0; j<size; j++) {
                grid[i][j] = 5;
            }
        }
        grid[0][source] = 3;
        grid[1][exit] = 4;
        return grid;
    }
    /** Function returns boolean if block above bucket has water, representing win
    */
    checkForWin(grid, bucketGrid) {
        let bucketLoc
        for (let i = 0; i < bucketGrid[1].length; i++) {
            if (i === 4) {
                bucketLoc = i;
            }
        }
        let previousBlock = grid[grid.length-1][bucketLoc];
        if (previousBlock === 2 || previousBlock === 3) {
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
                if ( this.grid[i][j] === 2) {
                    if ( this.grid[i+1][j] === 0) {
                         this.grid[i+1][j] = 4;
                    } else if ( this.grid[i+1][j] === 1) {
                        if ( this.grid[i][j-1] === 0)  this.grid[i][j-1] = 4;
                        if ( this.grid[i][j+1] === 0)  this.grid[i][j+1] = 4;
                    }
                    this.grid[i][j] = 3;
                }
            }
        }
        for(i=0; i< this.grid.length; i++) {
            for(j=0; j< this.grid[i].length; j++) {
                if ( this.grid[i][j] === 4)  this.grid[i][j] = 2;
            }
        }
        
    }
//shouldnt this be grid[y][x]?
    placeWater(x, y) {
         this.grid[y][x] = 2;
    }
    // test code end

    done() { //check sides, check split paths, never touch bottom
        for ( let i = 0; i < this.grid.length - 1; i++) {
            for( let j = 0; j < this.grid[0].length; j++) {
                if( this.grid[i][j] === 2) {
                    return false;
                }
            }
        }
        return true;
    }

    placeStone(x, y) {
        this.grid[y][x] = 1;
    }
    getIndex(x, y) {
        return (
          this.grid[y][x]
        )
      }
}

export default GameGrid