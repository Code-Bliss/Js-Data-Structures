/*

MAX HEAP DATA STRUCTURE for sorting in O(nlgn)

The (binary) heap data structure is an array object that we can view as a
nearly complete binary tree. Each
node of the tree corresponds to an element of the array. 
The tree is completely filled on all levels except possibly the lowest, which is filled from the
left up to a point. An array A that represents a heap is an object with two attributes: A:length, 
which (as usual) gives the number of elements in the array, and
A:heap-size, which represents how many elements in the heap are stored within
array A. That is, although A[1.... A.heapSize] may contain numbers, only the elements
 in A[1.... A.heapSize], where 0  <= A.heap-size <= A.length, are valid elements of the heap. 
 The root of the tree is A[1], and given the index i of a node, we
can easily compute the indices of its parent, left child, and right child.

example : https://www.hackerearth.com/practice/data-structures/trees/heapspriority-queues/tutorial/

*/


export default class Heap<T>{
    private heap: T[];
    private heapSize: number;

    constructor(){
        this.heap=[];
        this.heapSize=0;
    }

    // getters

    protected getValue(index: number) {
        return this.heap[index - 1];
    }

    protected getHeight() {
        return this.heapSize;
    }

    // setters

    protected setValue(index: number, value: T) {
        this.heap[index - 1] = value;
    }

    protected increaseHeight() {
        this.heapSize = this.heapSize + 1;
    }

    protected decreaseHeight() {
        this.heapSize = this.heapSize - 1;
    }



    protected heapifyRoot() {
        this.replace(1, this.getHeight());
        this.decreaseHeight();
        this.heapify(1);
    }

    /**
     *returns parent index
     *
     * @param {number} index
     * @returns
     * @memberof Heap
     */
    protected parent(index: number) {
        return Math.floor(index / 2)
    }

    /**
     *returns left child
     *
     * @param {number} index
     * @returns
     * @memberof Heap
     */
    private left(index: number) {
        return 2 * index;
    }

    /**
     *returns right child
     *
     * @param {number} index
     * @returns
     * @memberof Heap
     */
    private right(index: number) {
        return (2 * index) + 1;
    }

    /**
     *replaces values in specified indexes
     *
     * @private
     * @param {*} index1
     * @param {*} index2
     * @memberof Heap
     */
    protected replace(index1, index2) {
        const temp = this.getValue(index1);
        this.setValue(index1, this.getValue(index2));
        this.setValue(index2, temp);
    }

    /**
     *makes necessary correction to turn the tree into max heap 
     *
     * @private
     * @param {number} index
     * @memberof Heap
     */
    private heapify(index: number) {
        let l = this.left(index);
        let r = this.right(index);
        let largest;

        if (!(l > this.heapSize) && this.getValue(l) > this.getValue(index)) {
            largest = l;
        } else {
            largest = index;
        }

        if (!(r > this.heapSize) && this.getValue(r) > this.getValue(largest)) {
            largest = r;
        }

        if (largest !== index) {
            this.replace(largest, index)
            this.heapify(largest);
        }
    }

    /**
     *creates heap
     *
     * @private
     * @memberof Heap
     */
    private build_heap() {

        for (let index = Math.floor(this.heapSize / 2); index > 0; index--) {
            this.heapify(index);
        }
    }

    /**
     *sorts the given array
     *
     * @param {T[]} arr
     * @returns
     * @memberof Heap
     */
    public sort(arr: T[]) {
        this.heap = arr;
        this.heapSize = arr.length;
        this.build_heap();

        for (let index = this.heapSize; index > 1; index--) {
            this.heapifyRoot();
        }

        return this.heap;
    }


}