import Stack from "./Stack";

// RED BLACK TREES


/*
PROPERTIES:
 1. Every node is either red or black.
 2. The root is black
 3. Every leaf (NIL) is black.
 4. If a node is red, then both its children are black.
 5. For each node, all paths from the node to descendant leaves contain the same number of black nodes.
*/


class RedBlackTreeNode<T> {
    public left: RedBlackTreeNode<T>;
    public right: RedBlackTreeNode<T>;
    public parent: RedBlackTreeNode<T>;
    public value: T;
    public color: 'red' | 'black';


    constructor(nill: RedBlackTreeNode<null>) {
        this.left = nill;
        this.right = nill;
        this.parent = null;
        this.color = 'black';
    }
}

const nill: RedBlackTreeNode<null> = new RedBlackTreeNode(null)

class RedBlackTree<T> {

    // private nill: RedBlackTreeNode<null> = new RedBlackTreeNode(null);
    private nill: RedBlackTreeNode<null> = nill;
    private root: RedBlackTreeNode<T>;
    private blackHeight: number;

    constructor() {
        this.root = this.nill;
        this.blackHeight = 0;
    }

    // comment this
    getter() {
        return this.root;
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
    private rotateTree(direction: 'left' | 'right', node: RedBlackTreeNode<T>) {
        if (direction === 'left') {
            this.leftRotate(node);
        } else if (direction === 'right') {
            this.rightRotate(node);
        }
    }

    private leftRotate(x: RedBlackTreeNode<T>) {

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

    }

    private rightRotate(y: RedBlackTreeNode<T>) {

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

    }

    /**
     * @description:inserts node to the red black tree just like insertion in binary tree and then insertion_fixup is called
     * @dependency: insertion_fixup
     * 
     * @param {RedBlackTreeNode<T>} newNode
     * @memberof RedBlackTree
     */
    private insertNode(newNode: RedBlackTreeNode<T>) {
        let insertionPointer: RedBlackTreeNode<T> = this.nill;
        let traversalPointer: RedBlackTreeNode<T> = this.root;

        while (traversalPointer !== this.nill) {
            insertionPointer = traversalPointer;
            if (newNode.value < traversalPointer.value) {
                traversalPointer = traversalPointer.left;
            } else {
                traversalPointer = traversalPointer.right;
            }
        }

        newNode.parent = insertionPointer;
        if (insertionPointer === this.nill) {
            this.root = newNode;
        } else if (newNode.value < insertionPointer.value) {
            insertionPointer.left = newNode;
        } else {
            insertionPointer.right = newNode;
        }

        newNode.left = this.nill;
        newNode.right = this.nill;

        newNode.color = 'red';
        this.insertion_fixup(newNode)
    }

    /**
     *fixes the violation of rule 2,4 caused by inserting a node
     *
     * @param {RedBlackTreeNode<T>} node
     * @memberof RedBlackTree
     */
    private insertion_fixup(node: RedBlackTreeNode<T>) {
        while (node.parent && node.parent.color === 'red') {
            if (node.parent == node.parent.parent.left) {
                const uncle = node.parent.parent.right;

                if (uncle && uncle.color === 'red') {
                    node.parent.color = "black";
                    uncle.color = "black";
                    node.parent.parent.color = 'red';
                    node = node.parent.parent
                } else if (node == node.parent.right) {
                    node = node.parent;
                    this.rotateTree("left", node);
                } else {
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.rotateTree('right', node.parent.parent);
                }
            } else {
                const uncle = node.parent.parent.left;

                if (uncle && uncle.color === 'red') {
                    node.parent.color = "black";
                    uncle.color = "black";
                    node.parent.parent.color = 'red';
                    node = node.parent.parent
                } else if (node == node.parent.left) {
                    node = node.parent;
                    this.rotateTree("right", node);
                } else {
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.rotateTree('left', node.parent.parent);
                }
            }
        }

        if (this.root.color === 'red') {
            this.blackHeight = this.blackHeight + 1;
        }
        this.root.color = 'black'
    }

    /**
     * @description inserts values  into red black tree
     * Time Complexity: O(lg(n))
     * 
     * @param {T} value
     * @memberof RedBlackTree
     */
    insert(value: T) {
        const newNode: RedBlackTreeNode<T> = new RedBlackTreeNode<T>(this.nill);
        newNode.value = value;
        this.insertNode(newNode);
    }

    /**
     *@description returns next element value of the given element
     *
     * @param {RedBlackTreeNode<T>} z
     * @returns {RedBlackTreeNode<T>}
     * @memberof RedBlackTree
     */
    private successor(z: RedBlackTreeNode<T>): RedBlackTreeNode<T> {
        if (z === this.nill) {
            return z
        }
        return this.minimum(z.right)
    }

    /**
     *returns successor of given value i.e., next biggest value, 
     *returns null if it doesn't have successor or given value doesn't exist or there are no elements in tree
     *
     * @param {T} value
     * @returns
     * @memberof RedBlackTree
     */
    public successorValue(value: T) {
        const node = this.findNode(value);
        return this.successor(node).value;
    }

    private minimum(root: RedBlackTreeNode<T>): RedBlackTreeNode<T> {
        while (root !== this.nill && root.left !== this.nill) {
            root = root.left;
        }
        return root
    }

    /**
     *return minimum value of the tree, returns null if there are no elements in tree
     *
     * @returns
     * @memberof RedBlackTree
     */
    public minValue() {
        return this.minimum(this.root).value
    }

    /**
     *finds if a value is present in the tree
     *
     * @param {T} value
     * @returns {boolean}
     * @memberof RedBlackTree
     */
    public find(value: T): boolean {
        const node = this.findNode(value);
        if (node !== this.nill) {
            return true
        } else {
            return false
        }
    }

    private findNode(value: T): RedBlackTreeNode<T> {

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

    private deleteNode(z: RedBlackTreeNode<T>) {

        // node y is either either removed from the tree or moved within the tree
        let y: RedBlackTreeNode<T>

        // node x that moves into y's original position
        let x: RedBlackTreeNode<T>;

        // assignment of y
        if (z.left === this.nill || z.right === this.nill) {
            y = z;
        } else {
            y = this.successor(z);
        }

        // assignment of x
        if (y.left !== this.nill) {
            x = y.left;
        } else {
            x = y.right;
        }

        // move x to y's place
        x.parent = y.parent;
        if (y.parent === this.nill) {
            this.root = x;
        } else if (y === y.parent.left) {
            y.parent.left = x;
        } else {
            y.parent.right = x;
        }

        if (y !== z) {
            z.value = y.value
        }

        if (y.color === 'black') {
            this.deleteFixup(x)
        }
    }

    private deleteFixup(arbitraryNode: RedBlackTreeNode<T>) {

        let sibling: RedBlackTreeNode<T>;
        while (arbitraryNode !== this.root && arbitraryNode.color === 'black') {

            if (arbitraryNode === arbitraryNode.parent.left) {
                sibling = arbitraryNode.parent.right;

                //case 1
                if (sibling.color === 'red') {
                    sibling.color = 'black';
                    arbitraryNode.parent.color = 'red';
                    this.rotateTree('left', arbitraryNode.parent);
                    sibling = arbitraryNode.parent.right;
                }

                if (sibling.color === 'black') {

                    //case 2
                    if (sibling.left.color === 'black' && sibling.right.color === 'black') {
                        sibling.color = 'red';
                        arbitraryNode.parent.color = 'black';
                        arbitraryNode = arbitraryNode.parent;
                    }
                    //case 3
                    else if (sibling.right.color === 'black') {
                        sibling.left.color = 'black';
                        sibling.color = 'red';
                        this.rotateTree('right', sibling);
                    }
                    //case 4
                    else {
                        sibling.color = arbitraryNode.parent.color;
                        arbitraryNode.parent.color = 'black';
                        sibling.right.color = 'black';
                        this.rotateTree('left', arbitraryNode.parent);
                        arbitraryNode = this.root;
                    }
                }

            } else {
                sibling = arbitraryNode.parent.left;

                //case 1
                if (sibling.color === 'red') {
                    sibling.color = 'black';
                    arbitraryNode.parent.color = 'red';
                    this.rotateTree('right', arbitraryNode.parent);
                    sibling = arbitraryNode.parent.left;
                }

                if (sibling.color === 'black') {

                    //case 2
                    if (sibling.right.color === 'black' && sibling.left.color === 'black') {
                        sibling.color = 'red';
                        arbitraryNode.parent.color = 'black';
                        arbitraryNode = arbitraryNode.parent;
                    }
                    //case 3
                    else if (sibling.left.color === 'black') {
                        sibling.right.color = 'black';
                        sibling.color = 'red';
                        this.rotateTree('left', sibling);
                    }
                    //case 4
                    else {
                        sibling.color = arbitraryNode.parent.color;
                        arbitraryNode.parent.color = 'black';
                        sibling.left.color = 'black';
                        this.rotateTree('right', arbitraryNode.parent);
                        arbitraryNode = this.root;
                    }
                }
            }
        }

        if (arbitraryNode === this.root) {
            this.blackHeight = this.blackHeight - 1
        }
        arbitraryNode.color = 'black';
    }


    /**
     *deletes a value from red black tree
     *
     * @param {T} value
     * @memberof RedBlackTree
     */
    public delete(value: T) {
        const node = this.findNode(value)
        if (node === this.nill) {
            throw `no value with -(${value}) present in tree to delete`;
        } else {
            this.deleteNode(node);
        }
    }


    // traversals
    public inOrder() {
        const stack = new Stack<RedBlackTreeNode<T>>();
        const tree: T[] = [];

        let traverser = this.root;
        while (traverser !== this.nill || !stack.isEmpty()) {

            if (traverser === this.nill) {
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
        const stack = new Stack<RedBlackTreeNode<T>>();
        const tree: T[] = [];

        let traverser = this.root;
        while (traverser !== this.nill || !stack.isEmpty()) {

            if (traverser === this.nill) {
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
        const stack = new Stack<RedBlackTreeNode<T>>();
        const tree: T[] = [];

        let traverser = this.root;
        while (traverser !== this.nill || !stack.isEmpty()) {

            if (traverser === this.nill) {
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

            if (traverser.right !== this.nill) {
                stack.push(traverser.right);
            }
            stack.push(traverser);
            traverser = traverser.left;
        }
    }

    getSubTreeByBlackHeight(tree: RedBlackTree<T>, blackHeight: number) {
        let subTreeBlackHeight: number = tree.blackHeight;
        let subTree: RedBlackTreeNode<T> = tree.root;
        while (subTreeBlackHeight > blackHeight) {
            if (subTree.right) {
                subTree = subTree.right;
            } else {
                subTree = subTree.left;
            }
            if (subTree.color === 'black') {
                subTreeBlackHeight = subTreeBlackHeight - 1;
            }
        }

        return subTree;
    }
    
    /**
     *replaces u with v in the given tree
     *
     * @private
     * @param {RedBlackTree<T>} tree
     * @param {RedBlackTreeNode<T>} u
     * @param {RedBlackTreeNode<T>} v
     * @memberof RedBlackTree
     */
    private RB_Transplant(tree: RedBlackTree<T>, u: RedBlackTreeNode<T>, v: RedBlackTreeNode<T>) {
        if (u.parent === tree.nill) {
            tree.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        v.parent = u.parent;
    }

    /**
     *joins second tree into first tree with the merge node
     *
     * @private
     * @param {RedBlackTree<T>} tree
     * @param {RedBlackTreeNode<T>} firstTreeRoot
     * @param {RedBlackTreeNode<T>} mergeNode
     * @param {RedBlackTreeNode<T>} secondTreeRoot
     * @memberof RedBlackTree
     */
    private RB_Join(tree: RedBlackTree<T>, firstTreeRoot: RedBlackTreeNode<T>, mergeNode: RedBlackTreeNode<T>, secondTreeRoot: RedBlackTreeNode<T>) {
        this.RB_Transplant(tree, firstTreeRoot, mergeNode);

        if (firstTreeRoot.value < secondTreeRoot.value) {
            mergeNode.left = firstTreeRoot;
            mergeNode.right = secondTreeRoot;
        } else {
            mergeNode.right = firstTreeRoot;
            mergeNode.left = secondTreeRoot;
        }
        firstTreeRoot.parent = mergeNode;
        secondTreeRoot.parent = mergeNode;

    }
    /**
     *only gives correct results if new tree is completely has larger value items than present tree
     * addn info: The join operation takes two dynamic sets S1 and S2 
     * and an element x such that for any x1 ∈ S1 and x2 ∈ S2, we havekey[x1] ≤ key[x] ≤ key[x2]. 
     * It returns a set S = S1 ∪{x}∪ S2. In this problem, we investigate how to implement the join operation on red-black trees.
     *
     * TODO: should accept any tree to merge into existing
     *
     * @param {RedBlackTree<T>} newTree
     * @memberof RedBlackTree
     */
    public mergeTree(newTree: RedBlackTree<T>) {
        let smallTree: RedBlackTree<T>;
        let bigTree: RedBlackTree<T>;

        if (this.blackHeight < newTree.blackHeight) {
            smallTree = this;
            bigTree = newTree;
        } else {
            smallTree = newTree;
            bigTree = this;
        }

        smallTree.nill = this.nill;
        bigTree.nill = this.nill;

        const mergeNode = new RedBlackTreeNode<T>(smallTree.nill);
        mergeNode.color = 'red';
        mergeNode.value = smallTree.root.value;

        this.RB_Join(bigTree, this.getSubTreeByBlackHeight(bigTree, smallTree.blackHeight), mergeNode, smallTree.root);

        this.root = bigTree.root;
        this.nill = bigTree.nill;
        this.blackHeight = bigTree.blackHeight;

        this.insertion_fixup(mergeNode);

        this.deleteNode(mergeNode);

    }

}