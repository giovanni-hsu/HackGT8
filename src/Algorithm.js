function process(waterStatusArray, blockArray) {
	var newWaterStatusArray = new Array(waterStatusArray.length);
	var change = true;
	while (change) {
		change = false;
		for (let index = 0; index < blockArray.length; index++) {
			if (waterStatusArray[index] === 0 && index - 1 !== -1 && waterStatusArray[index-1] === 1 && blockArray[index-1] === 1) {
				waterStatusArray[index] = 1;
				change = true;
			}
			if (waterStatusArray[index] === 0 && index + 1 !== blockArray.length && waterStatusArray[index+1] === 1 && blockArray[index+1] === 1) {
				waterStatusArray[index] = 1;
				change = true;
			}
		}
	}
	for (let indexx = 0; indexx < blockArray.length; indexx++) {
		if (blockArray[indexx] === 0 && waterStatusArray[indexx] === 1) {
			newWaterStatusArray[indexx] = 1;
		} else {
			newWaterStatusArray[indexx] = 0;
		}
	}
	return newWaterStatusArray;
}