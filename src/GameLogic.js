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

    done() { //check sides, check split paths
        for (let i = 0; i <  this.grid[0].length; i++) {
            if ( this.grid[this.grid.length-1][i] === 2 ||  this.grid[this.grid.length-1][i] === 3) {
                return true
            }
        }
        return false
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