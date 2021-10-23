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
const numToIcon = {0:" ", 1:"#", 2:"o", 3:"o"};
function printGrid(grid) {
    process.stdout.write("----------------\n");
    for(var i=0; i<grid.length; i++) {
        for(var j=0; j<grid[i].length; j++) {
            process.stdout.write(numToIcon[grid[i][j]] + " ");
        }
        process.stdout.write("\n");
    }
    process.stdout.write("----------------\n");
}
// console.log(intializeGrid())
printGrid(intializeGrid())
function placeBlock(grid, x,y) {
	grid[x][y] = 1;
}