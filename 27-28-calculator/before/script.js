import Calculator from "./Calculator.js";
import formatInteger from "./util/formatNumber.js";
const fistOperand = document.querySelector(`[data-primary-operand]`);
const secondOperand = document.querySelector(`[data-secondary-operand]`);
const operationSymbol = document.querySelector("[data-operation]");

const calculator = new Calculator();

function main() {
	document.addEventListener("click", (e) => {
		if (e.target.matches("[data-all-clear]")) {
			calculator.clear();
			clear();
		}
		if (e.target.matches("[data-delete]")) {
			const number = calculator.removeDigits();
			fistOperand.textContent = number;
		}
		if (e.target.matches("[data-number]")) {
			const number = calculator.addDigits(e.target.textContent);
			fistOperand.textContent = number;
			fistOperand.dataset.value = calculator.primaryOperand;
			calculator.hasDot = number.includes(".") ? true : false;
		}
		if (e.target.matches("[data-operation]")) {
			calculator.operationSymbol = e.target.textContent;
			if (secondOperand.dataset.value !== "" && operationSymbol.innerText !== "") {
				const result = calculator.evaluate(e.target.textContent);
				clear();
				secondOperand.textContent = result;
				secondOperand.dataset.value = calculator.secondaryOperand;
				operationSymbol.innerText = calculator.operationSymbol;
			} else {
				const result = calculator.evaluate(e.target.textContent);
				clear();
				secondOperand.textContent = result;
				secondOperand.dataset.value = calculator.secondaryOperand;
				operationSymbol.innerText = calculator.operationSymbol;
			}
		}
		if (e.target.matches("[data-equals]")) {
			const result = calculator.evaluate();
			clear();
			fistOperand.textContent = result;
			fistOperand.dataset.value = calculator.primaryOperand;
		}
	});
}

main();

function clear() {
	secondOperand.textContent = calculator.secondaryOperand === "0" ? "" : calculator.secondaryOperand;
	secondOperand.dataset.value = calculator.secondaryOperand === "0" ? "" : calculator.secondaryOperand;
	fistOperand.textContent = calculator.primaryOperand;
	fistOperand.dataset.value = calculator.primaryOperand;
	operationSymbol.textContent = "";
}
