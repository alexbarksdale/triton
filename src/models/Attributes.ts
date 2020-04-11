export class Attributes<T> {
    constructor(private data: T) {}

    // extends is limiting the values K can have to what T has
    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    };

    set(update: T): void {
        Object.assign(this.data, update);
    }

    getAll(): T {
        return this.data;
    }
}
