/**Types of blocks:
 * 0 Air
 * 1 Stone
 * 2 Water
 * 3 Fixed water
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
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid.length; y++) {
			if (grid[x][y] == 2) {
				grid[x][y] = 0;
			}
		}
	}
}

function intializeGrid(size) {
    var grid = new Array(size);
    for (var i = 0; i < size; i++) {
        grid[i] = new Array(size);
        for(var j=0; j<size; j++) {
            grid[i][j] = 0;
        }
    }
    return grid;
}

const numToIcon = {0:" ", 1:"#", 2:"o", 3:"o"};

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