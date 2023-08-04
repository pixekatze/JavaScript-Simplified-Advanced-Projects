import formatInteger from "./util/formatNumber.js";

export default class Calculator {
	constructor() {
		this.clear();
	}

	#primaryOperand;
	#secondaryOperand;
	#operationSymbol;
	#hasDot;

	set primaryOperand(value) {
		this.#primaryOperand = value;
	}

	set secondaryOperand(value) {
		this.#secondaryOperand = value;
	}
	set hasDot(value = false) {
		this.#hasDot = value;
	}

	get hasDot() {
		return this.#hasDot;
	}

	get primaryOperand() {
		return this.#primaryOperand;
	}

	get secondaryOperand() {
		return this.#secondaryOperand;
	}

	get operationSymbol() {
		return this.#operationSymbol;
	}

	set operationSymbol(value = "") {
		this.#operationSymbol = value;
	}

	addDigits(digit) {
		if (this.hasDot && digit === ".") return this.primaryOperand;
		this.primaryOperand = this.primaryOperand + digit;
		const formattedNumber = this.displayNumber(this.primaryOperand);
		return formattedNumber;
	}

	displayNumber(number) {
		const [integer, decimal] = number.split(".");
		const formattedInteger = formatInteger(integer);
		if (decimal == null) return formattedInteger;
		return formattedInteger + "." + decimal;
	}

	removeDigits() {
		let value = this.primaryOperand;
		value = value.slice(0, -1);
		if (value.length > 0) {
			this.primaryOperand = value;
			const formattedNumber = this.displayNumber(this.primaryOperand);
			return formattedNumber;
		}
		if (value.length === 0) {
			this.primaryOperand = 0;
			const formattedNumber = this.displayNumber(this.primaryOperand);
			return formattedNumber;
		}
	}

	// evaluate(symbol = null) {
	// 	if (this.secondaryOperand !== "0" && this.operationSymbol !== "") {
	// 		const result = this.performOperation(this.operationSymbol);
	// 		if (symbol == null) {
	// 			this.primaryOperand = result;
	// 			const formattedNumber = this.displayNumber(result);
	// 			return formattedNumber;
	// 			this.clear();
	// 		}

	// 		this.secondaryOperand = result;
	// 		const formattedNumber = this.displayNumber(result);
	// 		return formattedNumber;
	// 	}
	// 	this.secondaryOperand = this.primaryOperand;
	// 	const formattedNumber = this.displayNumber(this.secondaryOperand);
	// 	return formattedNumber;
	// }

	clear() {
		this.primaryOperand = "0";
		this.secondaryOperand = "0";
		this.operationSymbol = "";
		this.hasDot = false;
	}

	performOperation(operation) {
		const secondaryInteger = parseFloat(this.#secondaryOperand);
		const primaryInteger = parseFloat(this.#primaryOperand);
		let result;
		switch (operation) {
			case "÷":
				result = secondaryInteger / primaryInteger;
				break;
			case "*":
				result = secondaryInteger * primaryInteger;
				break;
			case "+":
				result = secondaryInteger + primaryInteger;
				break;
			case "-":
				result = secondaryInteger - primaryInteger;
				break;
		}
		this.clear();
		return result;
	}
}
