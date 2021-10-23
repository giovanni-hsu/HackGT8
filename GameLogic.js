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