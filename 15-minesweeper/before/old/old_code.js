function markAdjacentTiles(minePositions) {
	const size = BOARD_SIZE - 1;
	let num = 0;
	const numberArr = [];
	const testArray = [
		{ x: 6, y: 7 },
		{ x: 6, y: 8 },
		{ x: 5, y: 8 },
	];
	console.log({ minePositions });
	minePositions.forEach((minePosition) => {
		for (let i = -1; i < 2; i++) {
			if (minePosition.x !== 0) {
				if (minePosition.y !== size) {
					if (minePosition.y !== 0) {
						const tileX = {
							x: minePosition.x - 1,
							y: minePosition.y + i,
							number: num + 1,
						};
						findMines(testArray, numberArr, tileX);
					} else if (minePosition.y === 0) {
						if (i !== -1) {
							const tileX = {
								x: minePosition.x - 1,
								y: minePosition.y + i,
								number: num + 1,
							};
							findMines(testArray, numberArr, tileX);
						}
					}
				} else if (minePosition.y === size) {
					if (i < 1) {
						const tileX = {
							x: minePosition.x - 1,
							y: minePosition.y + i,
							number: num + 1,
						};
						findMines(testArray, numberArr, tileX);
					}
				}
			}
		}
		for (let i = -1; i < 2; i++) {
			if (i !== 0) {
				if (minePosition.y !== size) {
					if (minePosition.y !== 0) {
						const tileX = {
							x: minePosition.x,
							y: minePosition.y + i,
							number: num + 1,
						};
						findMines(testArray, numberArr, tileX);
					} else {
						if (i > 0) {
							const tileX = {
								x: minePosition.x,
								y: minePosition.y + i,
								number: num + 1,
							};
							findMines(testArray, numberArr, tileX);
						}
					}
				} else {
					if (i === -1) {
						const tileX = {
							x: minePosition.x,
							y: minePosition.y + i,
							number: num + 1,
						};
						findMines(testArray, numberArr, tileX);
					}
				}
			}
		}
		for (let i = -1; i < 2; i++) {
			if (minePosition.x !== size) {
				if (minePosition.y !== size) {
					if (minePosition.y == 0) {
						if (i >= 0) {
							const tileX = {
								x: minePosition.x + 1,
								y: minePosition.y + i,
								number: num + 1,
							};
							findMines(testArray, numberArr, tileX);
						}
					} else {
						const tileX = {
							x: minePosition.x + 1,
							y: minePosition.y + i,
							number: num + 1,
						};
						findMines(testArray, numberArr, tileX);
					}
				} else {
					if (i < 1) {
						const tileX = {
							x: minePosition.x + 1,
							y: minePosition.y + i,
							number: num + 1,
						};
						findMines(testArray, numberArr, tileX);
					}
				}
			}
		}
	});

	return numberArr;
}
function findMines(testArray, numberArr, tileX) {
	if (!testArray.some((tile) => positionMatch(tile, tileX))) {
		if (!numberArr.some((tile) => positionMatch(tile, tileX))) {
			numberArr.push(tileX);
		}
	}
}

function reduceArray(numberArray) {
	console.log({ numberArray });
	const newArray = [];
	const rowA = [];

	numberArray.forEach((row) => {
		const { x, y, number } = row;
		console.log(x);
		console.log(y);
		console.log(number);
	});
	console.log({ newArray });
}
