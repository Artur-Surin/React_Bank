const getDate = (time) => {
    const date = new Date(time);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${day} ${month} ${hours}:${minutes}`;

    return formattedDate;
}

class Notification {
    static #list = [];
    static #count = 1;

    constructor({action, name, info}) {
        this.action = String(action);
        this.name = String(name);
        this.info = String(info);

        this.notificationId = Notification.#count++;
        this.date = new Date().getTime();
        this.ifUnread = true;
    }

    static create (data) {
        const newNotification = new Notification(data);
        Notification.#list.push(newNotification);

        console.log(`New ${newNotification.action.toUpperCase()} at ${getDate(newNotification.date)}`);
        return newNotification;
    }

    static update (id) {
        const note = this.#list.find((item) => item.notificationId === Number(id)) || null

        if (note) {
            note.ifUnread = false;
        }

        return true
    };

    static getList () {
        return Notification.#list.reverse();
    }

    static getUnread () {
        return Notification.#list.filter((item) => item.ifUnread === true);
    }
}

module.exports = { Notification };