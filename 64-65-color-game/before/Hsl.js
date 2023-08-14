import { getRandomNumber, randomIntFromInterval } from "./util.js";

export class HslColor {
	constructor() {
		this.hue = getRandomNumber(360);
		this.saturation = randomIntFromInterval(50, 100);
		this.lightness = randomIntFromInterval(35, 70);
	}
}

export function RgbToHsl(red, green, blue) {
	red /= 255;
	green /= 255;
	blue /= 255;

	let cmin = Math.min(red, green, blue);
	let cmax = Math.max(red, green, blue);
	let delta = cmax - cmin;
	let hue = 0;
	let saturation = 0;
	let lightness = 0;

	if (delta == 0) hue = 0;
	else if (cmax == red) hue = ((green - blue) / delta) % 6;
	else if (cmax == green) hue = (blue - red) / delta + 2;
	else hue = (red - green) / delta + 4;

	hue = Math.round(hue * 60);

	if (hue < 0) hue += 360;

	lightness = (cmax + cmin) / 2;

	saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

	saturation = +(saturation * 100).toFixed(1);
	lightness = +(lightness * 100).toFixed(1);

	saturation = Math.floor(saturation);
	lightness = Math.floor(lightness);

	// `hsl(${hue}, ${saturation}%, ${lightness}%)`;

	return { hue, saturation, lightness };
}

export function RgbToHue(red, green, blue) {
	red /= 255;
	green /= 255;
	blue /= 255;

	let cmin = Math.min(red, green, blue);
	let cmax = Math.max(red, green, blue);
	let delta = cmax - cmin;
	let hue = 0;

	if (delta == 0) hue = 0;
	else if (cmax == red) hue = ((green - blue) / delta) % 6;
	else if (cmax == green) hue = (blue - red) / delta + 2;
	else hue = (red - green) / delta + 4;

	hue = Math.round(hue * 60);

	if (hue < 0) hue += 360;

	return hue;
}

export function HslToRgb(hue, saturation, lightness) {
	saturation /= 100;
	lightness /= 100;

	let chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
	let x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
	let match = lightness - chroma / 2;
	let red = 0;
	let green = 0;
	let blue = 0;

	if (0 <= hue && hue < 60) {
		red = chroma;
		green = x;
		blue = 0;
	} else if (60 <= hue && hue < 120) {
		red = x;
		green = chroma;
		blue = 0;
	} else if (120 <= hue && hue < 180) {
		red = 0;
		green = chroma;
		blue = x;
	} else if (180 <= hue && hue < 240) {
		red = 0;
		green = x;
		blue = chroma;
	} else if (240 <= hue && hue < 300) {
		red = x;
		green = 0;
		blue = chroma;
	} else if (300 <= hue && hue < 360) {
		red = chroma;
		green = 0;
		blue = x;
	}
	red = Math.round((red + match) * 255);
	green = Math.round((green + match) * 255);
	blue = Math.round((blue + match) * 255);

	return { red: red, green: green, blue: blue };
}
