"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const uuid_1 = require("uuid");
const inititalUsers = [
    {
        id: (0, uuid_1.v4)(),
        username: 'Dasha',
        age: 15,
        hobbies: ['web development', 'knitting']
    },
    {
        id: (0, uuid_1.v4)(),
        username: 'Kate',
        age: 20,
        hobbies: []
    },
];
class DataBase {
    constructor() {
        this.users = inititalUsers;
        this.users = inititalUsers;
    }
    ;
    getUsers() {
        return this.users;
    }
    findUser(userId) {
        return this.users.find(user => user.id === userId) || null;
    }
    addUser(user) {
        this.users.push(user);
        return this.users;
    }
    updateUser(user) {
        const idx = this.users.findIndex(i => i.id === user.id);
        if (idx === -1)
            return null;
        this.users[idx] = user;
        return user;
    }
    deleteUser(userId) {
        const idx = this.users.findIndex(user => user.id === userId);
        if (idx === -1) {
            return null;
        }
        this.users = [...this.users.slice(0, idx), ...this.users.slice(idx + 1)];
    }
}
exports.DataBase = DataBase;
