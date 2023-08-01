const Account = require("./Account");
const CommandLine = require("./CommandLine");
const FormatCurrency = require("./FormatCurrency");

async function main() {
	try {
		const accountName = await CommandLine.ask("Which account would you like to access?");
		const account = await Account.find(accountName);
		if (account == null) account = await promptCreateAccount(accountName);
		if (account != null) {
			CommandLine.print(`\nPlease select one of the following options:`);
			await promtTask(account);
		}
	} catch (e) {
		CommandLine.print("\nERROR: Please try again.");
	}
}

async function promptCreateAccount(accountName) {
	const input = await CommandLine.ask(`That account doesn't exists. Would you like to create it? (Yes/No):`);
	const answer = input.toLowerCase();
	if (answer === "yes" || answer === "y") {
		return await Account.create(accountName);
	} else {
		CommandLine.print("\nWe hope we can do business with you in the future.");
	}
}

async function promtTask(account) {
	const option = await CommandLine.ask(` 1. View balance
 2. Withdraw money
 3. Deposit money
 4. Exit
Enter (1/2/3/4):`);
	switch (option) {
		case "1":
			break;
		case "2":
			await withdrawMoney(account);
			break;
		case "3":
			await depositMoney(account);
			break;
		case "4":
			CommandLine.print(`\nHave a great day!\n`);
			return;
		default:
			CommandLine.print(`\nOption not available.\n\n`);
			await promtTask(account);
	}
	CommandLine.print(`\nBalance: ${formatBalance(account)}\n\nWould you like to select another option?`);
	await promtTask(account);
}

function formatBalance(account) {
	const balance = parseFloat(account.balance);
	const formattedBalance = new FormatCurrency(balance);
	return formattedBalance.amount;
}

async function withdrawMoney(account) {
	const amount = await CommandLine.ask(`\nEnter the amount you want to withdraw:`);
	try {
		await account.withdraw(amount);
	} catch {
		CommandLine.print(`\nYou don't have enough funds. Your balance is: ${formatBalance(account)}`);
		await withdrawMoney(account);
	}
}
async function depositMoney(account) {
	const amount = await CommandLine.ask(`\nEnter the amount you want to deposit:`);
	await account.deposit(amount);
}

main();
