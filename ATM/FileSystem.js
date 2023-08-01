const fs = require("fs");

module.exports = class FileSystem {
	static read(path) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, (err, data) => {
				if (err) return reject(err);
				resolve(data);
			});
		});
	}

	static write(path, data) {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data.toString(), (err) => {
				if (err) return reject(err);
				resolve();
			});
		});
	}
};
