'use strict';

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
    get left() {
        return this.left;
    }
    set left() {
        return this.left;
    }
    get right() {
        return this.left;
    }
    set right() {
        return this.left;
    }
}
/**
 *insertData(data) ->used to insert data
 *removeData(data)->used to remove data from node and this function returns the root node after deletion
 *inorder()->returns inorder traversal of tree in array 
 *preorder()->returns preorder traversal of tree in array 
 *postorder()->returns postorder traversal of tree in arrayss
 *search(data)->returns the node with the given data if not found retruns null
 *getRootNode()->returns root node
 *findMin()->returns min node s
 * @class BST
 */
class BST {


    constructor() {
        this.root = null;
    }

    insertData(data) {
        let node = new TreeNode(data);
        if (!this.root) {
            this.root = node;
        } else {
            this.insertDataInToTree(node, this.root);
        }
    }

    insertDataInToTree(node, root) {
        if (node.data >= root.data) {
            if (root.right) {
                this.insertDataInToTree(node, root.right);
            } else {
                root.right = node;
            }
        } else {
            if (root.right) {
                this.insertDataInToTree(node, root.left);
            } else {
                root.left = node;
            }
        }
    }

    removeData(data) {
        this.root = this.removeDataFromTree(data, this.root);
    }

    removeDataFromTree(data, root) {
        if (!root) {
            return null;
        } else if (root.data > data) {
            root.left = this.removeDataFromTree(data, root.left);
        } else if (root.data < data) {
            root.right = this.removeDataFromTree(data, root.right)
        } else {
            if (!root.left && !root.right) {
                return null;
            } else if (root.left && !root.right) {
                return root.left;
            } else if (root.right && !root.left) {
                return root.right;
            } else {
                let tempNode = root.right;
                let childNode;
                let flag = 1;
                if (!tempNode.left && !tempNode.right) flag = 0;
                while (flag) {
                    tempNode = childNode ? childNode : tempNode;
                    if (tempNode.left) {
                        childNode = tempNode.left;
                    }
                    else if (tempNode.right) {
                        childNode = tempNode.right;
                    }
                    if (!childNode.left && !childNode.right) {
                        flag = 0;
                    }
                }
                if (tempNode.left && childNode) {
                    childNode.left = root.left;
                    childNode.right = root.right;
                    root = childNode;
                    tempNode.left = null;
                } else if (tempNode.right && childNode) {
                    childNode.left = root.left;
                    childNode.right = root.right;
                    root = childNode;
                    tempNode.right = null;

                } else {
                    // when tempnode->left and tempnode->right are null and child node dosen't exist
                    tempNode.left = root.left;
                    tempNode.right = null;
                    root = tempNode;
                }
            }
        }
        return root;
    }

    inorder() {
        let data = [];
        if (!this.root) {
            return data;
        }
        return this.inOrderTraversal(this.root, data);
    }
    inOrderTraversal(root, data) {
        if (root.left) {
            this.inOrderTraversal(root.left, data);
        }
        data.push(root.data);
        if (root.right) {
            this.inOrderTraversal(root.right, data);
        }
        return data;
    }

    preorder() {
        let data = [];
        if (!this.root) {
            return data;
        }
        return this.preOrderTraversal(this.root, data);
    }
    preOrderTraversal(root, data) {
        data.push(root.data);
        if (root.left) {
            this.preOrderTraversal(root.left, data);
        }
        if (root.right) {
            this.preOrderTraversal(root.right, data);
        }
        return data;
    }
    postOrder() {
        let data = [];
        if (!this.root) {
            return data;
        }
        return this.postOrderTraversal(this.root, data);
    }

    postOrderTraversal(root, data) {
        if (root.left) {
            this.postOrderTraversal(root.left, data);
        }
        if (root.right) {
            this.postOrderTraversal(root.right, data);
        }
        return data;
    }

    search(data) {
        if (!this.root) {
            return null;
        }
        return this.searchNode(this.root, data);
    }

    searchNode(root, data) {
        if (!root) {
            return null;
        } else if (root.data > data) {
            return this.searchNode(root.left, data);
        } else if (root.data < data) {
            return this.searchNode(root.right, data);
        } else {
            return root;
        }
    }
    getRootNode() {
        return this.root;
    }

    findMin() {
        return this.findMinNode(this.root);
    }
    findMinNode(root) {
        if (!root) {
            return null;
        } else if (root.left) {
            return this.findMinNode(root.left);
        } else {
            return root;
        }
    }
}