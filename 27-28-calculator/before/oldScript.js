import Calculator from "./Calculator.js";
import addGlobalEventListener from "./util/addGlobalEventListener.js";
import formatNumber from "./util/formatNumber.js";
const fistOperand = document.querySelector(`[data-primary-operand]`);
const secondOperand = document.querySelector(`[data-secondary-operand]`);
const operationSymbol = document.querySelector("[data-operation]");
let hasDot = false;

function main() {
	addGlobalEventListener("click", "button", (e) => {
		const content = e.target.textContent;
		setOperandValues(content);
	});
}

main();

function setOperandValues(content) {
	const symbols = /^[÷|\*|\+|\-]+/;
	const equal = /^[\=]+/;
	const delAC = /^[\w]+/;
	const numbersOrDot = /^[\d|\.]+/;

	if (content.match(numbersOrDot) != null) {
		if (hasDot && content === ".") return;
		console.log(fistOperand.dataset.value);
		console.log(content);
		const value = fistOperand.dataset.value + content;

		if (fistOperand.dataset.value.length > 15) return;
		fistOperand.dataset.value = value;
		const formattedNumber = formatNumber(fistOperand.dataset.value);
		fistOperand.textContent = formattedNumber;
		hasDot = fistOperand.dataset.value.includes(".") ? true : false;
		return;
	}
	if (secondOperand.dataset.value === "0" && content.match(symbols) != null) {
		setSecondOperator(content);
		return;
	}
	if (secondOperand.dataset.value !== "0" && content.match(equal) != null) {
		performCalculation();
		return;
	}
	if (secondOperand.dataset.value !== "0" && content.match(symbols) != null) {
		performSecondCalculation(content);
		return;
	}
	if (content.match(delAC) != null) {
		if (content === "AC") {
			clearValue();
		} else {
			deleteNumber();
		}
		return;
	}
}
function performCalculation() {
	const calculation = new Calculator(secondOperand.dataset.value, fistOperand.dataset.value);
	const result = calculation.performOperation(operationSymbol.innerText);
	clearValue();
	fistOperand.dataset.value = result;
	const formattedNumber = formatNumber(result);
	fistOperand.textContent = formattedNumber;
}
function performSecondCalculation(content) {
	const calculation = new Calculator(secondOperand.dataset.value, fistOperand.dataset.value);
	const result = calculation.performOperation(operationSymbol.innerText);
	clearValue();
	secondOperand.dataset.value = result;
	operationSymbol.innerText = content;
	const formattedNumber = formatNumber(result);
	secondOperand.textContent = formattedNumber;
}
function clearValue() {
	secondOperand.textContent = "";
	secondOperand.dataset.value = "0";
	fistOperand.textContent = "0";
	fistOperand.dataset.value = "0";
	operationSymbol.textContent = "";
	hasDot = false;
}

function setSecondOperator(content) {
	const firstValue = fistOperand.dataset.value;
	clearValue();
	secondOperand.dataset.value = firstValue;
	operationSymbol.innerText = content;
	const formattedNumber = formatNumber(firstValue);
	secondOperand.textContent = formattedNumber;
}

function deleteNumber() {
	let value = fistOperand.dataset.value;
	value = value.slice(0, -1);
	if (value.length > 0) {
		fistOperand.dataset.value = value;
		const formattedNumber = formatNumber(fistOperand.dataset.value);
		fistOperand.textContent = formattedNumber;
		return;
	}
	if (value.length === 0) {
		fistOperand.dataset.value = "";
		fistOperand.textContent = "0";
		return;
	}
}
