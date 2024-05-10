class Confirm {
	static #list = [];
  
	constructor(data) {
	  this.code = Confirm.generateCode();
	  this.data = data;
	}
  
	static generateCode = () => {
		return Math.floor(Math.random() * 9000) + 1000;
	};

	static create = (data) => {
		this.#list.push(new Confirm(data));
  
		setTimeout(() => {
			this.delete(code)
		}, 60 * 60 * 1000);
	};
  
	static delete = (code) => {
		const length = this.#list.length;
  
		this.#list = this.#list.filter(
			(item) => item.code !== code,
		);

		return length > this.#list.length;
	};
  
	static getData = (code) => {
		const obj = this.#list.find(
			(item) => item.code === code,
		);
  
		return obj ? obj.data : null;
	};

	static getCode = (data) => {
		const obj = this.#list.find(
			(item) => item.data === data,
		);
  
		return obj ? obj.code : null;
	};

	static getList = () => this.#list;
}
  
module.exports = { Confirm };