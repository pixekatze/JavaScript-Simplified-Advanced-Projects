export default class Calculator {
	constructor(firstOperand, secondOperand) {
		this.firstOperand = parseFloat(firstOperand);
		this.secondOperand = parseFloat(secondOperand);
	}
	performOperation(operation) {
		switch (operation) {
			case "÷":
				return this.firstOperand / this.secondOperand;
			case "*":
				return this.firstOperand * this.secondOperand;
			case "+":
				return this.firstOperand + this.secondOperand;
			case "-":
				return this.firstOperand - this.secondOperand;
		}
	}
}
