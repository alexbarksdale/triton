import { AxiosResponse, AxiosError } from 'axios';
import triton from '../apis/triton';

interface UserProps {
    id?: number;
    name?: string; // ? = optional
    age?: number;
}

type Callback = () => void;

export class User {
    events: { [key: string]: Callback[] } = {};

    constructor(private data: UserProps) {}

    get(propName: string): string | number {
        return this.data[propName];
    }

    set(update: UserProps): void {
        Object.assign(this.data, update);
    }

    /* EVENTING-SYSTEM */
    on(eventName: string, callback: Callback): void {
        // if the event at eventName doesn't exist handlers = []
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];

        if (!handlers || handlers.length === 0) return;

        handlers.forEach((callback) => callback());
    }
    /* END EVENTING-SYSTEM */

    fetch(): void {
        triton
            .get(`/users/${this.get('id')}`)
            .then((res: AxiosResponse): void => {
                this.set(res.data);
            })
            .catch((err: AxiosError) => console.log(err));
    }

    save(): void {
        const id = this.get('id');

        if (id) {
            triton.put(`/users/${id}`, this.data);
        } else {
            triton.post('/users', this.data);
        }
    }
}
