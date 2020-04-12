import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';

export interface UserProps {
    id?: number; // ? = optional
    name?: string;
    age?: number;
}

const ROOT_URL = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
    static buildUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing(),
            new ApiSync<UserProps>(ROOT_URL)
        );
    }
}

