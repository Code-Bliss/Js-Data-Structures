
/*

TREAPS 


If we insert a set of n items into a binary search tree, the resulting tree may be
horribly unbalanced, leading to long search times. As we saw in Section 12.4,
however, randomly built binary search trees tend to be balanced. Therefore, one
strategy that, on average, builds a balanced tree for a fixed set of items would be to
randomly permute the items and then insert them in that order into the tree.
What if we do not have all the items at once? If we receive the items one at a
time, can we still randomly build a binary search tree out of them?

We will examine a data structure that answers this question in the affirmative. A
treap is a binary search tree with a modified way of ordering the nodes. Figure 13.9
shows an example. As usual, each node x in the tree has a key value x:key. In
addition, we assign x:priority, which is a random number chosen independently
for each node. We assume that all priorities are distinct and also that all keys are
distinct. The nodes of the treap are ordered so that the keys obey the binary-search tree property and the priorities obey the min-heap order property:
 1. If  is a left child of u, then :key < u:key.
 2. If  is a right child of u, then :key > u:key.
 3. If  is a child of u, then :priority > u:priority.


(This combination of properties is why the tree is called a “treap”: it has features
of both a binary search tree and a heap.)
It helps to think of treaps in the following way. Suppose that we insert nodes
x1; x2;:::;xn, with associated keys, into a treap. Then the resulting treap is the
tree that would have been formed if the nodes had been inserted into a normal
binary search tree in the order given by their (randomly chosen) priorities, i.e.,
xi :priority < xj :priority means that we had inserted xi before xj .


*/


import Stack from "./Stack";


class TreapNode<T>{
    public left: TreapNode<T>;
    public right: TreapNode<T>;
    public parent: TreapNode<T>;
    public value: T;
    public priority: number;


    constructor() {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.priority = Math.random();
    }
}


export default class Treap<T>{

    private root: TreapNode<T>;
    constructor() {
        this.root = null;
    }

    private insertNode(newNode: TreapNode<T>) {
        let insertionPointer: TreapNode<T> = null;
        let traversalPointer: TreapNode<T> = this.root;

        while (traversalPointer !== null) {
            insertionPointer = traversalPointer;
            if (newNode.value < traversalPointer.value) {
                traversalPointer = traversalPointer.left;
            } else {
                traversalPointer = traversalPointer.right;
            }
        }

        newNode.parent = insertionPointer;
        if (insertionPointer === null) {
            this.root = newNode;
        } else if (newNode.value < insertionPointer.value) {
            insertionPointer.left = newNode;
        } else {
            insertionPointer.right = newNode;
        }

        newNode.left = null;
        newNode.right = null;

        this.insertion_fixup(newNode)
    }

    /**
 *   ROTATION ON THE TREE NODE
 *   Time Complexity: O(1)
 * 
 *
 *              |                                               |
 *              Y                right-rotate                   X
 *             / \           ---------------->>>>>             / \
 *            X   a          <<<<<----------------            b   Y
 *           / \                 left-rotate                     / \
 *          b   c                                               c   a
 * 
 * 
 * 
 */
    private rotateTree(direction: 'left' | 'right', node: TreapNode<T>) {
        if (direction === 'left') {
            this.leftRotate(node);
        } else if (direction === 'right') {
            this.rightRotate(node);
        }
    }

    private leftRotate(x: TreapNode<T>) {

        //Set y
        const y = x.right;

        //Turn y’s left subtree into x’s right subtree.
        x.right = y.left;
        if (y.left !== null) {
            y.left.parent = x;
        }

        // Link x’s parent to y. 
        y.parent = x.parent;
        if (x.parent === null) {
            this.root = y;
        } else if (x.parent.left === x) {
            x.parent.left = y
        } else {
            x.parent.right = y
        }

        //Put x on y’s left
        y.left = x;
        x.parent = y;

    }

    private rightRotate(y: TreapNode<T>) {

        //Set x
        const x = y.left;

        //Turn x’s right subtree into y’s left subtree.
        y.left = x.right;
        if (x.right !== null) {
            x.right.parent = y;
        }

        // Link y’s parent to x.
        x.parent = y.parent;
        if (y.parent === null) {
            this.root = x;
        } else if (y.parent.left === y) {
            y.parent.left = x;
        } else {
            y.parent.right = x
        }

        //Put y on x’s right
        x.right = y;
        y.parent = x;

    }

    private insertion_fixup(newNode: TreapNode<T>) {
        while (newNode.parent !== null && newNode.priority > newNode.parent.priority) {
            if (newNode === newNode.parent.left) {
                this.rotateTree('right', newNode.parent);
            } else {
                this.rotateTree('left', newNode.parent);
            }
        }
    }


    public insert(value: T) {
        const node = new TreapNode<T>();
        node.value = value;
        this.insertNode(node);
    }

    private findNode(value: T): TreapNode<T> {

        let traverser = this.root;

        while (traverser !== null && traverser.value !== value) {
            if (value < traverser.value) {
                traverser = traverser.left
            } else {
                traverser = traverser.right;
            }
        }
        return traverser;
    }

    private deleteNode(node: TreapNode<T>) {
        node.priority = Number.POSITIVE_INFINITY;
        while ((node.left && node.left.priority < node.priority) ||
            (node.right && node.right.priority < node.priority)) {
            if (node.left && node.left.priority < node.priority) {
                this.rotateTree('right', node);
            } else {
                this.rotateTree('left', node);
            }
        }

        if (node.parent === null) {
            this.root = null;
        }
        else if (node === node.parent.left) {
            node.parent.left = null;
        } else {
            node.parent.right = null
        }

        node.parent = null;

    }

    public delete(value: T) {
        const node = this.findNode(value)
        if (node === null) {
            throw `no value with -(${value}) present in tree to delete`;
        } else {
            this.deleteNode(node);
        }
    }

    // traversals
    public inOrder() {
        const stack = new Stack<TreapNode<T>>();
        const tree: T[] = [];

        let traverser = this.root;
        while (traverser !== null || !stack.isEmpty()) {

            if (traverser === null) {
                const parent = stack.pop();
                tree.push(parent.value);
                traverser = parent.right;
                continue;
            }
            stack.push(traverser);
            traverser = traverser.left;
        }

        return tree;

    }

    public preOrder() {
        const stack = new Stack<TreapNode<T>>();
        const tree: T[] = [];

        let traverser = this.root;
        while (traverser !== null || !stack.isEmpty()) {

            if (traverser === null) {
                const parent = stack.pop();
                traverser = parent.right;
                continue;
            }
            tree.push(traverser.value);
            stack.push(traverser);
            traverser = traverser.left;
        }

        return tree;

    }

    public postOrder() {
        const stack = new Stack<TreapNode<T>>();
        const tree: T[] = [];

        let traverser = this.root;
        while (traverser !== null || !stack.isEmpty()) {

            if (traverser === null) {
                const node = stack.pop();
                if (node.right === stack.pop()) {
                    traverser = node.right;
                    stack.push(node);
                    continue;
                }
                stack.revert();
                tree.push(node.value);
                continue;
            }

            if (traverser.right !== null) {
                stack.push(traverser.right);
            }
            stack.push(traverser);
            traverser = traverser.left;
        }
    }
}