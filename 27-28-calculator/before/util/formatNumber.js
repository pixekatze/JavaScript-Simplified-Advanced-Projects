export default function formatInteger(number) {
	return new Intl.NumberFormat("en-US", { style: "decimal", maximumIntegerDigits: 14, roundingPriority: "morePrecision" }).format(
		parseFloat(number)
	);
}
