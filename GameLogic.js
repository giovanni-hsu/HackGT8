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
	for (let x = 0; x < grid.length, x++) {
		for (let y = 0; y < grid.length, y++) {
			if (grid[x][y] == 2) {
				grid[x][y] = 0;
			}
		}
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