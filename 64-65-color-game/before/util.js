export function getRandomNumber(number) {
	return Math.floor(Math.random() * (number + 1));
}

export function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffleArray(array) {
	const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
}

export function getColorStringValue(red, green, blue) {
	return `rgb(${red}, ${green}, ${blue})`;
}

export function generateRandomRGB() {
	const MAX_RGB_VALUE = 255;
	const red = getRandomNumber(MAX_RGB_VALUE);
	const green = getRandomNumber(MAX_RGB_VALUE);
	const blue = getRandomNumber(MAX_RGB_VALUE);

	return { newRed: red, newGreen: green, newBlue: blue };
}
