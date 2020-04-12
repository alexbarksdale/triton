import { User } from '../models/User';

export class UserForm {
    constructor(public parent: Element, public model: User) {
        this.bindModal();
    }

    bindModal(): void {
        this.model.on('change', () => {
            this.render();
        });
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:#set-age': this.onSetAgeClick,
            'click:#set-name': this.onSetNameClick,
        };
    }

    onSetAgeClick = (): void => {
        this.model.setRandomAge();
    };

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input');
        if (input) {
            const name = input.value;
            this.model.set({ name });
        }
    };

    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <div>User name: ${this.model.get('name')} </div>
                <div>User age: ${this.model.get('age')} </div>
                <input />
                <button id="set-name">Change Name</button>
                <button id="set-age">Random Age</button>
            </div>
        `;
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach((el) => {
                el.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    render(): void {
        this.parent.innerHTML = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }
}
