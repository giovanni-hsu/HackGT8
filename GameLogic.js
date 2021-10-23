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
}