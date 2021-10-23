/**Types of blocks:
 * 0 Air
 * 1 Stone
 * 2 Water
 * 3 Fixed water
 * 4 bucket
 * 5 obsidian
 */

/** Function takes in grid, coordinates and type of block to be placed
 * returns boolean representing success / failure
 */
function placeBlock(grid, x, y, type) {
	if (grid[y][x] == 0) {
		grid[y][x] = type;
		return true;
	} else {
		return false;
	}
}

/** Function takes in grid and replaces water blocks with air blocks
 */
function resetGrid(grid) {
	for (let y = 0; y < grid.length; x++) {
		for (let x = 0; x < grid.length; y++) {
			if (grid[y][x] == 2) {
				grid[y][x] = 0;
			}
		}
	}
}
/** Function initializes bucket grid, taking in as input size of grid and source and exit points (just x coordinate)
 * for water. Places source of water and bucket on selected points, and obsidian everywhere else
 */
function intializeBucketGrid(size, source, exit) {
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
function checkForWin(grid, bucketGrid) {
    for (i = 0; i < bucketGrid[1].length; i++) {
		if (i == 4) {
            let bucketLoc = i;
		}
	}
    let previousBlock = grid[grid.length-1][bucketLoc];
    if (previousBlock == 2 || previousBlock == 3) {
        return true;
    }
    return false;
}

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

const numToIcon = {0:" ", 1:"#", 2:"x", 3:"o"};

function printGrid(grid) {
    process.stdout.write("----------------\n");
    for(var i=0; i<grid.length; i++) {
        for(var j=0; j<grid[i].length; j++) {
            process.stdout.write(numToIcon[grid[i][j]] + " ");
        }
        process.stdout.write("|\n");
    }
    process.stdout.write("----------------\n");
}

function updateGrid(grid) {
    for(var i=0; i<grid.length-1; i++) {
        for(var j=0; j<grid[i].length; j++) {
            if (grid[i][j] == 2) {
                if (grid[i+1][j] == 0) {
                    grid[i+1][j] = 4;
                } else if (grid[i+1][j] == 1) {
                    if (grid[i][j-1] == 0) grid[i][j-1] = 4;
                    if (grid[i][j+1] == 0) grid[i][j+1] = 4;
                }
                grid[i][j] = 3;
            }
        }
    }
    for(var i=0; i<grid.length; i++) {
        for(var j=0; j<grid[i].length; j++) {
            if (grid[i][j] == 4) grid[i][j] = 2;
        }
    }
}

// test code start
var grid = intializeGrid();
placeWater(grid, 0, 2);
placeWater(grid, 0, 6);
placeBlock(grid, 3, 2);
placeBlock(grid, 3, 3);
placeBlock(grid, 4, 4);
placeBlock(grid, 4, 6);
placeBlock(grid, 4, 7);
placeBlock(grid, 7, 5);
printGrid(grid);

for(var i=0; i<10; i++) {
    updateGrid(grid);
    printGrid(grid);
}

function placeWater(grid, x, y) {
    grid[x][y] = 2;
}
// test code end


function placeBlock(grid, x, y) {
	grid[x][y] = 1;
}