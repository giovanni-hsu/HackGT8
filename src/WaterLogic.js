class Block {
    constructor(blockType) {
        this.blockType = blockType;
    }
    setHeight(leftHeight, rightHeight) {
        if (this.blockType != "water") throw 'this is not a water block!'
        this.waterLevel = [leftHeight, rightHeight];
        this.nextWaterLevel = [leftHeight, rightHeight];
    }
    heighten(leftHeight, rightHeight) {
        if (this.blockType != "water") return;
        this.nextWaterLevel[0] = Math.max(this.waterLevel[0], leftHeight);
        this.nextWaterLevel[1] = Math.max(this.waterLevel[1], rightHeight);
    }
    update() {
        if (this.blockType != "water") return;
        this.waterLevel[0] = this.nextWaterLevel[0];
        this.waterLevel[1] = this.nextWaterLevel[1];
    }
}