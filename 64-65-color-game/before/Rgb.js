import { getRandomNumber, generateRandomRGB } from "./util.js";
import { HslColor, RgbToHue, RgbToHsl, HslToRgb } from "./Hsl.js";

export default class RgbColor {
	constructor() {
		const { newRed, newGreen, newBlue } = generateRandomRGB();
		this.red = newRed;
		this.green = newGreen;
		this.blue = newBlue;
	}

	generateHsl() {
		const { hue, saturation, lightness } = new HslColor();
		console.log(`hue: ${hue}, saturation: ${saturation}, lightness: ${lightness})`);
	}

	generateColorArray(difficulty) {
		if (difficulty === "easy") {
			console.log(this.getEasyColors());
			return this.getEasyColors();
		}
		const colorArray = [{ red: this.red, green: this.green, blue: this.blue, index: 0 }];

		for (let i = 0; i < 5; i++) {
			const { red, green, blue } = this.getColorArray(difficulty);
			colorArray.push({ red: red, green: green, blue: blue, index: i + 1 });
		}

		return colorArray;
	}

	getColorArray(difficulty) {
		switch (difficulty) {
			case "medium":
				const medium = this.getOtherColors([50, 100], this.red, this.green, this.blue);
				return medium;

			case "hard":
				const hard = this.getOtherColors([0, 50], this.red, this.green, this.blue);
				return hard;
		}
	}

	getOtherColors([min, max], red = this.red, green = this.green, blue = this.blue) {
		const { newRed, newGreen, newBlue } = generateRandomRGB();

		return this.compareColors(min, max, newRed, red, newGreen, green, newBlue, blue);
	}

	compareColors(min, max, red2, red, green2, green, blue2, blue) {
		const distance = Math.floor(Math.sqrt((red2 - red) ** 2 + (green2 - green) ** 2 + (blue2 - blue) ** 2));
		if (distance > min && distance < max) return { red: red2, green: green2, blue: blue2 };
		const { newRed, newGreen, newBlue } = generateRandomRGB();

		return this.compareColors(min, max, newRed, red, newGreen, green, newBlue, blue);
	}

	getEasyColors() {
		const { hue, saturation, lightness } = RgbToHsl(this.red, this.green, this.blue);

		const newHslColorArray = [];
		newHslColorArray.push({ hue, saturation, lightness });
		let pushCount = 0;
		console.log({ newHslColorArray });
		for (let i = 0; i < 200; i++) {
			const hsl = new HslColor();
			let count = 0;
			newHslColorArray.forEach((color, index) => {
				let hueMax = { min: Math.min(color.hue + 45, 360), max: 360 };
				let hueMin = { min: 0, max: Math.max(color.hue - 45, 0) };

				if (hueMax.min === 360) {
					if (hsl.hue > hueMin.min && hsl.hue < hueMin.max) {
						count++;
					}
				} else if (hueMin.max === 0) {
					if (hsl.hue > hueMax.min && hsl.hue < hueMax.max) {
						count++;
					}
				} else {
					if ((hsl.hue > hueMin.min && hsl.hue < hueMin.max) || (hsl.hue > hueMax.min && hsl.hue < hueMax.max)) {
						count++;
					}
				}

				if (count === newHslColorArray.length) {
					pushCount++;

					newHslColorArray.push({ hue: hsl.hue, saturation: hsl.saturation, lightness: hsl.lightness });
				}
			});
			if (pushCount === 5) {
				console.log({ newHslColorArray });

				return this.convertArrayToHsl(newHslColorArray);
			}
		}
		return this.convertArrayToHsl(newHslColorArray);
	}

	convertArrayToHsl(newHslColorArray) {
		const hslColorArray = [...newHslColorArray];
		const convertedColorArray = [];
		hslColorArray.forEach((color) => {
			const converted = HslToRgb(color.hue, color.saturation, color.lightness);
			convertedColorArray.push(converted);
		});

		console.log({ convertedColorArray });
		return convertedColorArray;
	}

	findClose(colorArray) {
		const hslColorArray = [...colorArray];
		while (hslColorArray.length <= 6) {
			hslColorArray.forEach((color) => {
				const hsl = new HslColor();

				let hueMax = { min: Math.min(color.hue + 45, 360), max: 360 };
				let hueMin = { min: 0, max: Math.max(color.hue - 45, 0) };

				if (hueMax.min === 360) {
					if (hsl.hue > hueMin.min && hsl.hue < hueMin.max)
						hslColorArray.push({ hue: hsl.hue, saturation: hsl.saturation, lightness: hsl.lightness });
				} else if (hueMin.max === 0) {
					if (hsl.hue > hueMax.min && hsl.hue < hueMax.max)
						hslColorArray.push({ hue: hsl.hue, saturation: hsl.saturation, lightness: hsl.lightness });
				} else {
					if ((hsl.hue > hueMin.min && hsl.hue < hueMin.max) || (hsl.hue > hueMax.min && hsl.hue < hueMax.max))
						hslColorArray.push({ hue: hsl.hue, saturation: hsl.saturation, lightness: hsl.lightness });
				}
			});
		}

		return hslColorArray;
	}

	getColorString(red = this.red, green = this.green, blue = this.blue) {
		return `rgb(${red}, ${green}, ${blue})`;
	}
}
