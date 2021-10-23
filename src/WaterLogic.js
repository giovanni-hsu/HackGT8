class Block {
    constructor(blockType) {
        this.blockType = blockType;
    }
    initWater(leftHeight, rightHeight) {
        this.nextWaterLevel = [leftHeight, rightHeight];
        this.waterLevel = [0, 0];
        //this.downFlow = false;

        this.updated = true
    }
    /*initDownFlowWater() {
        this.nextWaterLevel = [7, 7];
        this.waterLevel = [0, 0];
        //this.downFlow = true;

        this.updated = true
    }*/
    heighten(leftHeight, rightHeight) {
        if (this.blockType !== "water") return;
        this.nextWaterLevel[0] = Math.max(this.waterLevel[0], leftHeight, this.nextWaterLevel[0]);
        this.nextWaterLevel[1] = Math.max(this.waterLevel[1], rightHeight, this.nextWaterLevel[1]);
    }
    update() {
        if (!this.updated) return;
        this.blockType = "water";
        this.waterLevel[0] = this.nextWaterLevel[0];
        this.waterLevel[1] = this.nextWaterLevel[1];
        this.nextWaterLevel = [0, 0];
        if (this.waterLevel[0] <= 0 && this.waterLevel[1] <= 0) {
            this.blockType = "air";
            this.waterLevel = [0, 0];
        }
        this.updated = false;
    }
    print() {
        if (this.blockType === "stone") return "##";
        if (this.blockType === "air") return "  ";
        if (this.blockType === "water") return this.waterLevel[0] + "" + this.waterLevel[1];
    }
}
export default Block;