export function RgbToHex(r, g, b) {
	const red = convertDecimalToHex(r);
	const green = convertDecimalToHex(g);
	const blue = convertDecimalToHex(b);

	return `#${red}${green}${blue}`;
}

function convertDecimalToHex(number) {
	const hexString = number.toString(16);
	return hexString;
}
