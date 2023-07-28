export const TITLE_STATUSES = {
	HIDDEN: "hidden",
	MINE: "mine",
	NUMBER: "number",
	MARKED: "marked",
};

export function createBoard(boardSize, numberOfMines) {
	const board = [];
	const minesArray = createMines(boardSize, numberOfMines);

	for (let x = 0; x < boardSize; x++) {
		const row = [];
		for (let y = 0; y < boardSize; y++) {
			const element = document.createElement("div");
			element.dataset.status = TITLE_STATUSES.HIDDEN;
			const tile = {
				element,
				x,
				y,
				mine: minesArray.some((mine) => checkDuplicates(mine.x, mine.y, x, y)),
				get status() {
					return element.dataset.status;
				},
				set status(value) {
					this.element.dataset.status = value;
				},
			};

			row.push(tile);
		}
		board.push(row);
	}

	return board;
}

export function markTile(tile) {
	if (tile.status === TITLE_STATUSES.MARKED) {
		tile.status = TITLE_STATUSES.HIDDEN;
	} else if (tile.status === TITLE_STATUSES.HIDDEN) {
		tile.status = TITLE_STATUSES.MARKED;
	}
}

export function revealTile(board, tile) {
	if (tile.status !== TITLE_STATUSES.HIDDEN) return;

	if (tile.mine) {
		tile.status = TITLE_STATUSES.MINE;
		return;
	}

	const AdjacentTiles = checkAdjacentTiles(board, tile);
	const mines = AdjacentTiles.filter((tile) => tile.mine === true);

	tile.status = TITLE_STATUSES.NUMBER;

	if (mines.length === 0) {
		AdjacentTiles.forEach((tile) => revealTile(board, tile));
	} else {
		tile.element.textContent = mines.length;
	}
}

function checkAdjacentTiles(board, tile) {
	const tiles = [];
	for (let xOfset = -1; xOfset < 2; xOfset++) {
		for (let yOfset = -1; yOfset < 2; yOfset++) {
			const newX = tile.x + xOfset;
			const newY = tile.y + yOfset;

			if (newX >= 0 && newY >= 0 && newX <= 9 && newY <= 9) {
				const adjacentTile = board[newX][newY];

				tiles.push(adjacentTile);
			}
		}
	}

	return tiles;
}

export function checkWin(board) {
	return board.every((row) => {
		return row.every((tile) => {
			return (
				tile.status === TITLE_STATUSES.NUMBER ||
				(tile.mine && (tile.status === TITLE_STATUSES.HIDDEN || tile.status === TITLE_STATUSES.MARKED))
			);
		});
	});
}

export function checkLose(board) {
	return board.some((row) => {
		return row.some((tile) => {
			return tile.status === TITLE_STATUSES.MINE;
		});
	});
}

function revealAllBoard(board) {
	board.forEach((row) => {
		row.forEach((tile) => {
			if (!tile.mine) {
				if (tile.status === TITLE_STATUSES.MARKED) tile.status = TITLE_STATUSES.HIDDEN;
				if (tile.status === TITLE_STATUSES.HIDDEN) {
					revealTile(board, tile);
				}
			} else {
				tile.status = TITLE_STATUSES.MINE;
			}
		});
	});
}

function createMines(boardSize, numberOfMines) {
	const minesArray = [];
	console.log("before");

	while (minesArray.length < numberOfMines) {
		const minePosition = {
			x: getRandomNumber(boardSize),
			y: getRandomNumber(boardSize),
		};
		console.log(minesArray.length);
		if (minesArray.length !== 0) {
			if (!minesArray.some((mine) => checkDuplicates(mine.x, mine.y, minePosition.x, minePosition.y))) minesArray.push(minePosition);
		} else {
			minesArray.push(minePosition);
		}
	}

	return minesArray;
}

function getRandomNumber(boardSize) {
	return Math.floor(Math.random() * boardSize);
}

function checkDuplicates(mineX, mineY, newMineX, newMineY) {
	return mineX === newMineX && mineY === newMineY;
}
