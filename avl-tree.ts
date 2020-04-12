

class AvlTreeNode<T> {
    public left: AvlTreeNode<T>;
    public right: AvlTreeNode<T>;
    public parent: AvlTreeNode<T>;
    public value: T;
    public height: number;
    constructor(nill: AvlTreeNode<null>) {
        this.left = nill;
        this.right = nill;
        this.parent = null;
        this.height = 0;
    }
}

const nill: AvlTreeNode<null> = new AvlTreeNode(null)

/**
 *An AVL tree is a binary search tree that is height balanced: for each node xx,
 *the heights of the left and right subtrees of xx differ by at most 1. 
 *
 * @class AVLTree
 * @template T
 */
class AVLTree<T> {
    private nill: AvlTreeNode<null> = nill;
    private root: AvlTreeNode<T>;

    constructor() {
        this.root = this.nill;
    }

    private rotateTree(direction: 'left' | 'right', node: AvlTreeNode<T>) {
        if (direction === 'left') {
            return this.leftRotate(node);
        } else if (direction === 'right') {
            return this.rightRotate(node);
        }
    }

    private leftRotate(x: AvlTreeNode<T>) {

        //Set y
        const y = x.right;

        //Turn y’s left subtree into x’s right subtree.
        x.right = y.left;
        if (y.left !== this.nill) {
            y.left.parent = x;
        }

        // Link x’s parent to y. 
        y.parent = x.parent;
        if (x.parent === this.nill) {
            this.root = y;
        } else if (x.parent.left === x) {
            x.parent.left = y
        } else {
            x.parent.right = y
        }

        //Put x on y’s left
        y.left = x;
        x.parent = y;
        return y;
    }

    private rightRotate(y: AvlTreeNode<T>) {

        //Set x
        const x = y.left;

        //Turn x’s right subtree into y’s left subtree.
        y.left = x.right;
        if (x.right !== this.nill) {
            x.right.parent = y;
        }

        // Link y’s parent to x.
        x.parent = y.parent;
        if (y.parent === this.nill) {
            this.root = x;
        } else if (y.parent.left === y) {
            y.parent.left = x;
        } else {
            y.parent.right = x
        }

        //Put y on x’s right
        x.right = y;
        y.parent = x;
        return x;
    }
    /**
     *@description:Balance function takes a subtree rooted at node-xx whose left and right children are height balanced and have heights
     *that differ by at most 22, i.e., x.right.h−x.left.h∣≤2, and alters the subtree rooted at xx to be height balanced
     *
     * @param {AvlTreeNode<T>} node
     * @returns
     * @memberof AVLTree
     */
    balance(xx: AvlTreeNode<T>) {
        const balancingFactor = xx.left.height - xx.right.height;
        if (balancingFactor > 1 || balancingFactor < -1) {
            if (xx.left.left.height - xx.left.right.height >= 0)
                xx = this.rotateTree('right', xx);
            else {
                xx.left = this.rotateTree('left', xx.left);
                xx = this.rotateTree('right', xx);
            }
        } else if (balancingFactor < -1) {
            if (xx.right.left.height - xx.right.right.height <= 0)
                xx = this.rotateTree('left', xx);
            else {
                xx.right = this.rotateTree('right', xx.right);
                xx = this.rotateTree('left', xx);
            }
        }
        return xx;
    }
    /**
     *@description:Insert a new value in to tree
     *
     * @param {T} value
     * @memberof AVLTree
     */
    insert(value: T) {
        const newNode = new AvlTreeNode<T>(null);
        newNode.value = value;
        this.insertNode(newNode);
    }

    private insertNode(newNode: AvlTreeNode<T>) {
        let insertionPointer: AvlTreeNode<T> = this.nill;
        let traversalPointer: AvlTreeNode<T> = this.root;
        this.insertNodeRecursively(traversalPointer, insertionPointer, newNode);
        let temp = newNode.parent;
        while (temp != nill) {
            temp = this.balance(temp);
            temp = temp.parent;
        }
    }

    private maximumOfTwoNumbers(x1, x2) {
        return x1 > x2 ? x1 : x2;
    }

    private insertNodeRecursively(traversalPointer, insertionPointer, newNode) {
        if (traversalPointer === nill) {
            if (insertionPointer === nill) {
                this.root = newNode;
            } else if (newNode.value < insertionPointer.value) {
                insertionPointer.left = newNode;
            } else {
                insertionPointer.right = newNode;
            }
            newNode.parent = insertionPointer;
            newNode.height = 0;
        } else {
            insertionPointer = traversalPointer;
            if (newNode.value < traversalPointer.value) {
                this.insertNodeRecursively(traversalPointer.left, insertionPointer, newNode);
            } else {
                this.insertNodeRecursively(traversalPointer.right, insertionPointer, newNode);
            }
            traversalPointer.height = this.maximumOfTwoNumbers(traversalPointer.left, traversalPointer.right) + 1;
        }
    }

    private minimum(root: AvlTreeNode<T>): AvlTreeNode<T> {
        while (root !== this.nill && root.left !== this.nill) {
            root = root.left;
        }
        return root;
    }

    private findNode(value: T): AvlTreeNode<T> {

        let traverser = this.root;

        while (traverser !== this.nill && traverser.value !== value) {
            if (value < traverser.value) {
                traverser = traverser.left
            } else {
                traverser = traverser.right;
            }
        }
        return traverser;
    }

    /**
   *@description returns next element value of the given element
   *
   * @param {RedBlackTreeNode<T>} z
   * @returns {RedBlackTreeNode<T>}
   * @memberof RedBlackTree
   */
    private successor(z: AvlTreeNode<T>): AvlTreeNode<T> {
        if (z === this.nill) {
            return z
        }
        return this.minimum(z.right)
    }

    /**
     *@description:Delete a node with value(v) in the tree
     *
     * @param {T} value
     * @memberof AVLTree
     */
    delete(value: T) {
        const node = this.findNode(value)
        if (node === this.nill) {
            throw `no value with -(${value}) present in tree to delete`;
        } else {
            let x: AvlTreeNode<T>;
            if (node.left === nill || node.right === nill) {
                if (node.parent.left === node) {
                    node.parent.left = nill;
                } else {
                    node.parent.right = nill;
                }
                x = node.parent;
            } else if (node.left === nill) {
                if (node.parent.left === node) {
                    node.parent.left = node.right;
                } else {
                    node.parent.right = node.right;
                }
                x = node.parent;
            } else if (node.right === nill) {
                if (node.parent.left === node) {
                    node.parent.left = node.left;
                } else {
                    node.parent.right = node.left;
                }
                x = node.parent;
            } else {
                const successorNode = this.successor(node.right);
                node.value = successorNode.value;
                if (successorNode.right != nill) {
                    if (successorNode.parent.left === successorNode) {
                        successorNode.parent.left = successorNode.right;
                    } else {
                        successorNode.parent.right = successorNode.right;
                    }
                }
                x = successorNode.parent;
            }

            let temp = x;
            while (temp != nill) {
                temp.height = this.maximumOfTwoNumbers(temp.left.height, temp.right.height) + 1;
                temp = temp.parent;
            }
            temp = x;
            while (temp != nill) {
                temp = this.balance(temp);
                temp = temp.parent;
            }
        }
    }

}
