export class TreeNode<T>{
    data: T
    constructor(data: T) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
    get left() {
        return this.left;
    }
    set left(data: TreeNode<T>) {
        this.left = data;
    }
    get right() {
        return this.right;
    }
    set right(data: TreeNode<T>) {
        this.right = data;
    }
}