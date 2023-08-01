const FileSystem = require("./FileSystem");

module.exports = class Account {
	constructor(name, balance) {
		this.#name = name;
		this.#balance = balance;
	}

	#name;
	#balance;

	get name() {
		return this.#name;
	}

	get balance() {
		return this.#balance;
	}

	get filePath() {
		return `accounts/${this.name}.txt`;
	}

	async deposit(amount) {
		await FileSystem.write(this.filePath, this.#balance + parseFloat(amount));
		this.#balance = this.#balance + parseFloat(amount);
	}

	async withdraw(amount) {
		if (this.balance < amount) throw new Error();
		await FileSystem.write(this.filePath, this.#balance - parseFloat(amount));
		this.#balance = this.#balance - parseFloat(amount);
	}

	async #load() {
		this.#balance = parseFloat(await FileSystem.read(this.filePath));
	}

	static async create(accountName) {
		const account = new Account(accountName);
		await FileSystem.write(account.filePath, 0);
		account.#balance = 0;
		return account;
	}

	static async find(accountName) {
		const account = new Account(accountName);
		try {
			await account.#load();
			return account;
		} catch (e) {
			return;
		}
	}
};
