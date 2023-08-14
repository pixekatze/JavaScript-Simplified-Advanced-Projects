import { RgbToHex } from "./Hex.js";
import { RgbToHsl } from "./Hsl.js";
import RgbColor from "./Rgb.js";
import { shuffleArray, getColorStringValue } from "./util.js";

const colorGrid = document.querySelector("[data-color-grid]");
const colorString = document.querySelector("[data-color-string]");
const results = document.querySelector("[data-results]");
const resultsText = document.querySelector("[data-results-text]");
const formatSelections = document.querySelectorAll("[data-format]");
const difficultySelections = document.querySelectorAll("[data-difficulty]");

document.addEventListener("DOMContentLoaded", resetGame);

export function getFormatSelection() {
	const format = [...formatSelections].find((formatSelection) => {
		return formatSelection.checked;
	});
	return format.value;
}
export function getDifficultySelection() {
	const selection = [...difficultySelections].find((difficultySelection) => {
		return difficultySelection.checked;
	});
	return selection.value;
}

function resetGame() {
	clearGrid();
	results.classList.add("hide");
	resultsText.textContent = "";
	const format = getFormatSelection();
	const color = new RgbColor();

	const string = getColorString(color, format);

	const difficulty = getDifficultySelection();
	getColorGrid(color, difficulty);

	colorString.dataset.colorString = color.getColorString();
	colorString.textContent = string;
}

function checkWinOrLose(e) {
	const targetColor = colorString.dataset.colorString;
	const clickedColor = e.target.style.backgroundColor;
	const colors = colorGrid.children;

	[...colors].forEach((color) => {
		color.classList.add("wrong");
	});
	e.target.classList.remove("wrong");
	results.classList.remove("hide");

	if (clickedColor === targetColor) {
		resultsText.textContent = "Correct!";
	} else {
		resultsText.textContent = "Incorrect :(";
	}
}

function getColorString(color, format) {
	switch (format) {
		case "rgb":
			return color.getColorString();
		case "hsl":
			const { hue, saturation, lightness } = RgbToHsl(color.red, color.green, color.blue);

			return `hsl(${hue}, ${saturation}%, ${lightness}%)`;

		case "hex":
			return RgbToHex(color.red, color.green, color.blue);
	}
}
function getColorGrid(color, difficulty) {
	const colorArray = color.generateColorArray(difficulty);
	const newArray = [];
	colorArray.forEach((color) => {
		newArray.push(getColorStringValue(color.red, color.green, color.blue));
	});

	shuffleArray(newArray);
	populateColorGrid(newArray);
}

function populateColorGrid(colorArray) {
	colorArray.forEach((color) => {
		const colorSquare = document.createElement("button");
		colorSquare.style.backgroundColor = color;
		colorGrid.append(colorSquare);
	});
}

function clearGrid() {
	while (colorGrid.firstChild) {
		colorGrid.removeChild(colorGrid.firstChild);
	}
}

document.addEventListener("click", (e) => {
	if (e.target.matches("button") && !e.target.matches("[data-next-btn]")) {
		checkWinOrLose(e);
		return;
	}
	resetGame();
});
