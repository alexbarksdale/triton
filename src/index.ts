import { User } from './models/User';

const user = new User({ name: 'User', age: 20 });

user.on('change', () => {
    console.log('Fired');
});
user.trigger('change');

console.log(user);
