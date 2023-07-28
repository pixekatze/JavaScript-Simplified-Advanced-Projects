import { BOARD_SIZE } from "./script.js";

export const TITLE_STATUSES = {
	HIDDEN: "hidden",
	MINE: "mine",
	NUMBER: "number",
	MARKED: "marked",
};

export function createBoard(boardSize, numberOfMines) {
	const board = [];
	const minePositions = getMinePositions(boardSize, numberOfMines);

	for (let x = 0; x < boardSize; x++) {
		const row = [];
		for (let y = 0; y < boardSize; y++) {
			const element = document.createElement("div");
			element.dataset.status = TITLE_STATUSES.HIDDEN;
			const tile = {
				element,
				x,
				y,
				mine: minePositions.some((mines) => positionMatch({ x, y }, mines)),
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

	console.log({ board });

	return board;
}

export function revealTile(board, tile) {
	if (tile.status !== TITLE_STATUSES.HIDDEN) {
		return;
	}
	if (tile.mine) {
		tile.status = TITLE_STATUSES.MINE;
		return;
	}

	tile.status = TITLE_STATUSES.NUMBER;
	const adjacentTiles = nearbyTiles(board, tile);

	const mines = adjacentTiles.filter((t) => t.mine);
	if (mines.length === 0) {
		adjacentTiles.forEach((tile) => {
			revealTile(board, tile);
		});
	} else {
		tile.element.textContent = mines.length;
	}
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

function nearbyTiles(board, { x, y }) {
	const tiles = [];

	for (let xOfset = -1; xOfset <= 1; xOfset++) {
		for (let yOfset = -1; yOfset <= 1; yOfset++) {
			const tile = board[x + xOfset]?.[y + yOfset];
			if (tile) tiles.push(tile);
		}
	}

	return tiles;
}

export function markTile(tile) {
	if (tile.status !== TITLE_STATUSES.HIDDEN && tile.status !== TITLE_STATUSES.MARKED) {
		return;
	}

	if (tile.status === TITLE_STATUSES.MARKED) {
		tile.status = TITLE_STATUSES.HIDDEN;
	} else {
		tile.status = TITLE_STATUSES.MARKED;
	}
}

function getMinePositions(boardSize, numberOfMines) {
	const positions = [];

	while (positions.length < numberOfMines) {
		const position = {
			x: randomNumber(boardSize),
			y: randomNumber(boardSize),
		};

		if (!positions.some((positionVal) => positionMatch(positionVal, position))) {
			positions.push(position);
		}
	}
	return positions;
}

function positionMatch(positionVal, position) {
	return positionVal.x === position.x && positionVal.y === position.y;
}

function randomNumber(size) {
	return Math.floor(Math.random() * size);
}
