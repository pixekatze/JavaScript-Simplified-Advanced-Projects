import Calculator from "./Calculator.js";
import formatInteger from "./util/formatNumber.js";
const fistOperand = document.querySelector(`[data-primary-operand]`);
const secondOperand = document.querySelector(`[data-secondary-operand]`);
const operationSymbol = document.querySelector("[data-operation]");

const calculator = new Calculator();

function main() {
	document.addEventListener("click", (e) => {
		if (e.target.matches("[data-all-clear]")) {
			clear();
		}
		if (e.target.matches("[data-delete]")) {
			const number = calculator.removeDigits();
			fistOperand.textContent = displayNumber(number);
		}
		if (e.target.matches("[data-number]")) {
			const number = calculator.addDigits(e.target.textContent);
			fistOperand.textContent = number;
			fistOperand.dataset.value = calculator.primaryOperand;
			calculator.hasDot = number.includes(".") ? true : false;
			console.log(calculator.hasDot);
		}
		if (e.target.matches("[data-operation]")) {
			calculator.operationSymbol = e.target.textContent;
			evaluate(e.target.textContent);
		}
		if (e.target.matches("[data-equals]")) {
			evaluate();
		}
	});
}

main();

function displayNumber(number) {
	const [integer, decimal] = number.split(".");
	const formattedInteger = formatInteger(integer);
	if (decimal == null) return formattedInteger;
	return formattedInteger + "." + decimal;
}

function evaluate(symbol = null) {
	if (secondOperand.dataset.value !== "" && operationSymbol.innerText !== "") {
		const result = calculator.performOperation(operationSymbol.innerText);
		clear();
		if (symbol == null) {
			fistOperand.dataset.value = result;
			calculator.primaryOperand = result;
			const formattedNumber = displayNumber(fistOperand.dataset.value);
			fistOperand.textContent = formattedNumber;
			return;
		}

		secondOperand.dataset.value = result;
		calculator.secondaryOperand = result;
		operationSymbol.innerText = symbol;
		const formattedNumber = displayNumber(secondOperand.dataset.value);
		secondOperand.textContent = formattedNumber;
		return;
	}
	const firstValue = calculator.primaryOperand;
	clear();
	calculator.secondaryOperand = firstValue;
	secondOperand.dataset.value = firstValue;
	operationSymbol.innerText = symbol;
	const formattedNumber = formatInteger(firstValue);
	secondOperand.textContent = formattedNumber;
}

function clear() {
	calculator.clear();
	secondOperand.textContent = calculator.secondaryOperand === "0" ? "" : calculator.secondaryOperand;
	secondOperand.dataset.value = calculator.secondaryOperand === "0" ? "" : calculator.secondaryOperand;
	fistOperand.textContent = calculator.primaryOperand;
	fistOperand.dataset.value = calculator.primaryOperand;
	operationSymbol.textContent = calculator.operationSymbol;
}
