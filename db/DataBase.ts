import { User } from "../types/user";

export class DataBase {
  users:User[] = [];

  constructor() {
  };
  
  getUsers() {
    return this.users;
  }

  findUser(userId: number) {
    return this.users.find(user => user.id === userId) || null;
  }

  addUser (user: User) {
    this.users.push(user);
    
    return this.users;
  }

  updateUser(user: User) {
    const idx = this.users.findIndex(i => i.id === user.id);
    if (idx === -1) return null;
    this.users[idx] = user;
    
    return user;
  }

  deleteUser(userId: number) {
    const idx = this.users.findIndex(user => user.id === userId);

    if (idx === -1) {
      return null;
    }

    this.users = [...this.users.slice(0, idx), ...this.users.slice(idx + 1)];
  }
}