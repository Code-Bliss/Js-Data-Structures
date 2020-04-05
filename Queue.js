'use strict';

class Queue {
    constructor() {
        this.storage = new Array()
    }

    enqueue() {
        return this.storage.push(arguments)
    }

    dequeue() {
        return this.storage.splice(0,1)
    }
}