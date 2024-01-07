const fs = require('fs');
const path = require('path');

class UserManager {
    static #users = [];
    static dataPath = path.join(__dirname, 'data', 'users.json');

    constructor() {
        this.init();
    }

    async init() {
        try {
            const file = await fs.promises.readFile(UserManager.dataPath, 'utf-8');
            UserManager.#users = JSON.parse(file);
        } catch (error) {
            await fs.promises.writeFile(UserManager.dataPath, '[]', 'utf8');
        }
    }

    async create(data) {
        try {
            const user = {
                id: UserManager.#users.length === 0 ? 1 : UserManager.#users[UserManager.#users.length - 1].id + 1,
                name: data.name,
                photo: data.photo,
                email: data.email,
            };

            if (!user.name || !user.photo) {
                throw new Error('Please, insert name & photo');
            }

            UserManager.#users.push(user);
            await this.saveData();
            return true;
        } catch (error) {
            return { error: error.message };
        }
    }

    read() {
        try {
            if (UserManager.#users.length === 0) {
                throw new Error('Not found users!');
            } else {
                return UserManager.#users;
            }
        } catch (error) {
            return { error: error.message };
        }
    }

    readOne(id) {
        try {
            const user = UserManager.#users.find((each) => each.id === Number(id));
            if (!user) {
                throw new Error('Not found user!');
            } else {
                return user;
            }
        } catch (error) {
            return { error: error.message };
        }
    }

    async saveData() {
        try {
            await fs.promises.writeFile(UserManager.dataPath, JSON.stringify(UserManager.#users, null, 2), 'utf8');
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports = UserManager;
