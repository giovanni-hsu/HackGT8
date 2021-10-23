/**Types of blocks:
 * 0 Air
 * 1 Stone
 * 2 Water
 * 3 Fixed water
 * 4 bucket
 */

/** Function takes in grid, coordinates and type of block to be placed
 * returns boolean representing success / failure
 */
function placeBlock(grid, x, y, type) {
	if (grid[x][y] == 0) {
		grid[x][y] = type;
		return true;
	} else {
		return false;
	}
}

/** Function takes in grid and replaces water blocks with air blocks
 */
function resetGrid(grid) {
	for (let x = 0; x < grid.length, x++) {
		for (let y = 0; y < grid.length, y++) {
			if (grid[x][y] == 2) {
				grid[x][y] = 0;
			}
		}
	}
}
/** Function initializes bucket grid, taking in as input size of grid and source and exit points
 * for water. Places source of water and bucket on selected points, and stone everywhere else
 */
function intializeBucketGrid(size, source, exit) {
    const HEIGHT = 2;
    var grid = new Array(HEIGHT);
    for (var i = 0; i < HEIGHT; i++) {
        grid[i] = new Array(size);
        for(var j=0; j<size; j++) {
            grid[i][j] = 1;
        }
    }
    grid[0][source] = 3;
    grid[1][exit] = 4;
    return grid;
}
/** Possibly not needed in this way
function checkForWin(grid, bucketGrid) {
	for (i = 0; i < bucketGrid[1].length, i++) {
		if (i == 4) {

		}
	}
} */

function intializeGrid() {
    const SIZE = 8;
    var grid = new Array(SIZE);
    for (var i = 0; i < SIZE; i++) {
        grid[i] = new Array(SIZE);
        for(var j=0; j<SIZE; j++) {
            grid[i][j] = 0;
        }
    }
    return grid;
}
function printGrid(grid) {
    const SIZE = grid.length;
    for(var i=0; i<SIZE; i++) {
        for(var j=0; j<SIZE; j++) {
            process.stdout.write(grid[i][j] + " ");
        }
        process.stdout.write("\n");
    }
}
// console.log(intializeGrid())
printGrid(intializeGrid())
function placeBlock(grid, x,y) {
	grid[x][y] = 1;
}