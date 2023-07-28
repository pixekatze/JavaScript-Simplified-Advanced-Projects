import { createBoard, markTile, revealTile, checkWin, checkLose } from "./minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector("[data-mine-count]");
const messageText = document.querySelector(".subtext");

board.forEach((row) => {
	row.forEach((tile) => {
		boardElement.append(tile.element);
		tile.element.addEventListener("click", () => {
			revealTile(board, tile);
			checkGameEnd();
		});
		tile.element.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			markTile(tile);
			listMinesLeft();
		});
	});
});

minesLeftText.textContent = NUMBER_OF_MINES;
boardElement.style.setProperty("--size", BOARD_SIZE);

function listMinesLeft() {
	const markedTilesCount = board.reduce((count, row) => {
		return count + row.filter((tile) => tile.status === "marked").length;
	}, 0);

	minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}

function checkGameEnd() {
	const win = checkWin(board);
	const lose = checkLose(board);

	if (win || lose) {
		boardElement.addEventListener("click", stopProp, { capture: true });
		boardElement.addEventListener("contextmenu", stopProp, { capture: true });
	}

	if (win) {
		messageText.textContent = "You Win!";
		board.forEach((row) => {
			row.forEach((tile) => {
				if (tile.mine) revealTile(board, tile);
			});
		});
	}
	if (lose) {
		messageText.textContent = "You Lose :(";
		board.forEach((row) => {
			row.forEach((tile) => {
				if (tile.status === TITLE_STATUSES.MARKED) markTile(tile);
				if (tile.mine || tile.status === TITLE_STATUSES.HIDDEN) revealTile(board, tile);
			});
		});
	}
}

function stopProp(e) {
	e.stopImmediatePropagation();
}
