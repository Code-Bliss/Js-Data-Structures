'use strict';

class Stack {
    constructor() {
        this.storage = new Array()
    }

    push() {
        return this.storage.push(arguments)
    }

    pop() {
        return this.storage.pop()
    }
}