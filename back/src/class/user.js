class User {
	static #list = [];
	static #count = 1;	
	static #savings = 50;

	constructor({email, password}) {
		this.email = String(email).toLowerCase();
		this.password = String(password);

		this.isConfirm = false;
		this.userId = User.#count++;
		this.property = User.#savings
	};

	static create(data) {
		const user = new User(data);

		this.#list.push(user);

		return user;
	};
	
	static getByData(data) {
		if (typeof(data) === 'number') {
			return (
				this.#list.find((user) => user.userId === data)
				|| null
			)
		} else {
			return (
				this.#list.find((user) => user.email === data.toLowerCase())
				|| null
			)
		}
	};

	static updateData (user, typeNewData, newData) {
		if (typeNewData === 'email') {
			user.email = String(newData).toLowerCase();
			return true;
		} else if (typeNewData === 'password') {
			user.password = String(newData);
		}
		return false;
	};

	static userConfirm (email) {
		const user = User.getByData(email);
	
		if (user) user.isConfirm = true;
		return false;
	};

	static getList = () => this.#list;
};

module.exports = { User };