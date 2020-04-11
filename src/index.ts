import { User } from './models/User';

const user = new User({ id: 1, name: 'Save test', age: 900 });

user.on('save', () => {
    console.log(user);
});

user.save();
