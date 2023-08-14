import { getRandomNumber } from "./util.js";
import { RgbToHue } from "./Hsl.js";
let count = 0;
export default class RgbColor {
	constructor() {
		this.red = getRandomNumber(255);
		this.green = getRandomNumber(255);
		this.blue = getRandomNumber(255);
		this.clear();
	}

	getColorArray(difficulty) {
		const difficultyRange = this.getDifficulty(difficulty);
		const colorArray = [{ red: this.red, green: this.green, blue: this.blue, index: 0 }];

		for (let i = 0; i < 5; i++) {
			const [red, green, blue] = this.getOtherColors(difficultyRange, colorArray[i].red, colorArray[i].green, colorArray[i].blue);
			colorArray.push({ red: red, green: green, blue: blue, index: i + 1 });
		}
		this.convertToHsl(colorArray);
		console.log({ colorArray });
		const newArray = this.findClose(colorArray, difficultyRange);
		console.log({ newArray });
		return newArray;
	}

	convertToHsl(colorArray) {
		const newArray = [...colorArray];
		newArray.forEach((color) => {
			color.hue = RgbToHue(color.red, color.green, color.blue);
		});
	}

	findClose(colorArray, difficultyRange) {
		if (difficultyRange[0] !== 220) return colorArray;
		const newColorArray = [...colorArray];
		const badColors = [];
		while (badColors.length > 0) {
			badColors.pop();
		}
		console.log(badColors);
		newColorArray.forEach((color1, index1) => {
			newColorArray.forEach((color2, index2) => {
				if (index1 !== index2) {
					let hueMax = color2.hue + 45;
					if (hueMax > 360) hueMax = 360;
					let hueMin = color2.hue - 45;
					if (hueMin < 0) hueMin = 0;
					count++;
					console.log(`hue2 :${color2.hue}, hueMin: ${hueMin} < hue: ${color1.hue} < hueMax: ${hueMax}, count: ${count}`);

					console.log(color1.hue < hueMax);
					console.log(color1.hue > hueMin);

					if (color1.hue < hueMax && color1.hue > hueMin) {
						badColors[color2.index] = color2;
					}
					if (badColors.length > 0) {
						// console.log({ badColors });
						badColors.forEach((badColor) => {
							const [red, green, blue] = this.getOtherColors(difficultyRange);
							newColorArray[badColor.index] = { red: red, green: green, blue: blue, index: badColor.index };
							this.convertToHsl(newColorArray);
						});
						// this.findClose(newColorArray, difficultyRange);
					}
				}
			});
		});
		return newColorArray;
		// for (let i = 0; i < 6; i++) {
		// 	if (num + i >= newColorArray.length) return newColorArray;

		// 	for (let j = 0; j < newColorArray.length; j++) {
		// 		// console.log(j);
		// 		if (num + j >= newColorArray.length) return newColorArray;
		// 		let hueMax = newColorArray[num + j].hue + 45;
		// 		if (hueMax > 360) hueMax = 360;
		// 		let hueMin = newColorArray[num + j].hue - 45;
		// 		if (hueMin < 0) hueMin = 0;
		// 		count++;
		// 		console.log(
		// 			`hue2 :${newColorArray[num + j].hue}, hueMin: ${hueMin} < hue: ${newColorArray[i].hue} < hueMax: ${hueMax}, count: ${count}`
		// 		);

		// 		console.log(newColorArray[i].hue > hueMin);
		// 		console.log(newColorArray[i].hue < hueMax);

		// 		if (newColorArray[i].hue < hueMax && newColorArray[i].hue > hueMin) {
		// 			badColors.push(newColorArray[num + j]);
		// 		}
		// 		if (badColors.length > 0) {
		// 			console.log({ badColors });
		// 			badColors.forEach((badColor) => {
		// 				const [red, green, blue] = this.getOtherColors(difficultyRange);
		// 				newColorArray[badColor.index] = { red: red, green: green, blue: blue, index: badColor.index };
		// 				this.convertToHsl(newColorArray);
		// 			});
		// 			this.findClose(newColorArray, difficultyRange);
		// 		}
		// 	}
		// }
	}
	getEasyColors() {
		const { hue, saturation, lightness } = RgbToHsl(this.red, this.green, this.blue);

		const newHslColorArray = [];
		console.log({ newHslColorArray });
		newHslColorArray.push({ hue, saturation, lightness });
		let forCount = 0;
		let pushCount = 0;

		//while (newHslColorArray.length < 7)
		for (let i = 0; i < 20; i++) {
			forCount++;
			console.log(`=============================================================================
For Starts => Count :${forCount}, =========================================================`);

			const hsl = new HslColor();
			const distant = [];
			let count = 0;
			let forEachCount = 0;
			console.log(`Count: ${count}`);
			console.log(`ColorArrayLength: ${newHslColorArray.length}`);
			newHslColorArray.forEach((color, index) => {
				forEachCount++;
				console.log(`------------------------------------------------------------------------
ForEach Starts => Count :${forEachCount}, -------------------------------------------`);
				let hueMax = { min: Math.min(color.hue + 45, 360), max: 360 };
				let hueMin = { min: 0, max: Math.max(color.hue - 45, 0) };
				// console.log(`distant: ${distant.length}, ColorArray: ${hslColorArray.length},`);
				console.log(`hue :${hsl.hue}, hueMin: ${hueMin.min}, ${hueMin.max} hue: ${color.hue} hueMax: ${hueMax.min}, ${hueMax.max},`);

				if (hueMax.min === 360) {
					if (hsl.hue > hueMin.min && hsl.hue < hueMin.max) {
						count++;
						console.log(`First: ${count}, Index: ${index}`);
						distant.push(true);
						console.log({ distant });
					}
				} else if (hueMin.max === 0) {
					if (hsl.hue > hueMax.min && hsl.hue < hueMax.max) {
						count++;
						console.log(`Second: ${count}, Index: ${index}`);
						distant.push(true);
						console.log({ distant });
					}
				} else {
					if ((hsl.hue > hueMin.min && hsl.hue < hueMin.max) || (hsl.hue > hueMax.min && hsl.hue < hueMax.max)) {
						count++;
						distant.push(true);
						console.log(`Third: ${count}, Index: ${index}`);
						console.log({ distant });
					}
				}
				console.log(`Count: ${count}`);

				if (count === newHslColorArray.length) {
					pushCount++;
					console.log(`*********************************************************************************
PUSHED!!!!! => Count :${pushCount}, *************************************`);
					newHslColorArray.push({ hue: hsl.hue, saturation: hsl.saturation, lightness: hsl.lightness });
				}
				console.log({ newHslColorArray });
			});

			console.log(`*********************************************************************************
For Ends => Count :${pushCount}, *************************************`);
			if (pushCount === 6) return;
		}

		convertArrayToHsl(newHslColorArray);
	}
	getColorString(red = this.red, green = this.green, blue = this.blue) {
		return `rgb(${red}, ${green}, ${blue})`;
	}

	getOtherColors([min, max], red = this.red, green = this.green, blue = this.blue) {
		const newRed = getRandomNumber(255);
		const newGreen = getRandomNumber(255);
		const newBlue = getRandomNumber(255);

		return this.compareColors(min, max, newRed, red, newGreen, green, newBlue, blue);
	}

	getDifficulty(difficulty) {
		switch (difficulty) {
			case "easy":
				return [220, 765];

			case "medium":
				return [50, 100];

			case "hard":
				return [0, 50];
		}
	}

	clear() {
		this.badColors = [];
	}

	compareColors(min, max, red2, red, green2, green, blue2, blue) {
		const distance = Math.floor(Math.sqrt((red2 - red) ** 2 + (green2 - green) ** 2 + (blue2 - blue) ** 2));
		if (distance > min && distance < max) return [red2, green2, blue2];
		const newRed = getRandomNumber(255);
		const newGreen = getRandomNumber(255);
		const newBlue = getRandomNumber(255);
		return this.compareColors(min, max, newRed, red, newGreen, green, newBlue, blue);
	}
}
