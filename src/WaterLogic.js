class Block {
    constructor(blockType) {
        this.blockType = blockType;
    }
    heighten(leftHeight, rightHeight) {
        return;
    }
    update() {
        return;
    }
}
class Water extends Block{
    constructor(leftHeight, rightHeight) {
        super("water")
        this.waterLevel = [leftHeight, rightHeight];
        this.nextWaterLevel = [leftHeight, rightHeight];
    }
    heighten(leftHeight, rightHeight) {
        this.nextWaterLevel[0] = Math.max(this.waterLevel[0], leftHeight);
        this.nextWaterLevel[1] = Math.max(this.waterLevel[1], rightHeight);
    }
    update() {
        this.waterLevel[0] = this.nextWaterLevel[0];
        this.waterLevel[1] = this.nextWaterLevel[1];
    }
}
block = new Water();
console.log(block.blockType)
console.log(block.waterLevel)