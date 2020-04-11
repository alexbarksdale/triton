import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { AxiosResponse, AxiosError } from 'axios';

export interface UserProps {
    id?: number; // ? = optional
    name?: string;
    age?: number;
}

const ROOT_URL = 'http://localhost:3000/users';

export class User {
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(ROOT_URL);
    public attributes: Attributes<UserProps>;

    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    }

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    get get() {
        return this.attributes.get;
    }

    set(update: UserProps): void {
        this.attributes.set(update);
        this.events.trigger('change');
    }

    fetch(): void {
        const id = this.attributes.get('id');

        if (typeof id !== 'number') {
            throw new Error('Cannot fetch without an id');
        }

        this.sync.fetch(id).then((res: AxiosResponse): void => {
            this.set(res.data);
        });
    }

    save(): void {
        this.sync
            .save(this.attributes.getAll())
            .then((res: AxiosResponse): void => {
                this.trigger('save');
            })
            .catch((err: AxiosError) => {
                this.trigger('error');
            });
    }
}
