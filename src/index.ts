import { User } from './models/User';

const user = new User({ name: 'User', age: 20 });

user.set({ name: 'NewUser' });

console.log(user.get('name'));
console.log(user.get('age'));

