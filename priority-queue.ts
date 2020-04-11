/*

A priority queue is a data structure for maintaining a set S of elements, each
with an associated value called a key. A max-priority queue supports the following
operations:


INSERT( x) inserts the element x into the set S, which is equivalent to the operation S =S U {x}
MAXIMUM() returns the element of S with the largest key.
EXTRACT-MAX() removes and returns the element of S with the largest key.
INCREASE-KEY(x, k) increases the value of element x’s key to the new value k,
which is assumed to be at least as large as x’s current key value.


*/


import Heap from "./heap";


class PriorityQueue<T> extends Heap<T> {

    constructor() {
        super();
    }

    /**
     *returns the element of S with the largest key
     *
     * @returns
     * @memberof PriorityQueue
     */
    public maximum() {
        return this.getValue(1);
    }

    /**
     *removes and returns the element of S with the largest key
     *
     * @returns
     * @memberof PriorityQueue
     */
    public extractMax() {
        if (this.getHeight() < 1) {
            throw 'heap underflow';
        }
        const max = this.getValue(1);
        this.heapifyRoot();
        return max;
    }

    /**
     *helper function for insertion to retain violated properties of heap
     *
     * @param {number} index
     * @memberof PriorityQueue
     */
    private heapifyInsertion(index: number) {
        while (index > 1 && this.getValue(this.parent(index)) < this.getValue(index)) {
            this.replace(this.parent(index), index);
            index = this.parent(index);
        }
    }

    /**
     *increases the value of element x’s key to the new value k
     *
     * @param {number} index
     * @param {T} value
     * @memberof PriorityQueue
     */
    public increaseKey(index: number, value: T) {
        if (this.getValue(index) > value) {
            throw 'new value is smaller than current';
        }
        this.setValue(index, value);
        this.heapifyInsertion(index);
    }

    /**
     *inserts the element x into the set S, which is equivalent to the operation S =S U {x}
     *
     * @param {T} value
     * @memberof PriorityQueue
     */
    public insert(value: T) {
        this.increaseHeight();
        this.setValue(this.getHeight(), value);
        this.heapifyInsertion(this.getHeight());
    }

}