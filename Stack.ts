
export default class Stack<T> {
    private storage: Array<T>;
    private previousVersion: Array<T>;

    constructor() {
        this.storage = new Array();
        this.previousVersion = new Array();
    }

    push(...items: T[]) {
        this.previousVersion = [...this.storage];
        return this.storage.push(...items)
    }

    pop() {
        this.previousVersion = [...this.storage];
        return this.storage.pop()
    }

    isEmpty() {
        return this.storage.length === 0;
    }

    revert() {
        const result = this.storage.length !== this.previousVersion.length;
        this.storage = [...this.previousVersion];
        return result;
    }
}