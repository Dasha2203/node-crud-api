import { User } from "../types/user";
import {v4 as uuidv4} from 'uuid';

const inititalUsers: User[] = [
  {
    id: uuidv4(),
    username: 'Dasha',
    age: 15,
    hobbies: ['web development', 'knitting']
  },
  {
    id: uuidv4(),
    username: 'Kate',
    age: 20,
    hobbies: []
  },
];

export class DataBase {
  users:User[] = inititalUsers;

  constructor() {
    this.users = inititalUsers;
  };
  
  getUsers() {
    return this.users;
  }

  findUser(userId: string) {
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

  deleteUser(userId: string) {
    const idx = this.users.findIndex(user => user.id === userId);

    if (idx === -1) {
      return null;
    }

    this.users = [...this.users.slice(0, idx), ...this.users.slice(idx + 1)];
  }
}