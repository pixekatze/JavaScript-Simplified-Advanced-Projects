module.exports = class FormatCurrency {
	constructor(amount) {
		this.#amount = amount;
	}

	#amount;

	get amount() {
		return new Intl.NumberFormat(undefined, {
			style: "currency",
			currency: "USD",
		}).format(this.#amount);
	}
};
