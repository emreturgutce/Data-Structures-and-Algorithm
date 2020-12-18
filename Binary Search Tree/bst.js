class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(val) {
        this.root = this.insertHelper(this.root, val);
    }

    insertHelper(root, val) {
        if (!root) {
            return (this.root = new Node(val));
        }

        if (val < root.val) {
            root.left = this.insertHelper(root.left, val);
        } else if (val > root.val) {
            root.right = this.insertHelper(root.right, val);
        }

        return root;
    }

    search(root, val) {
        if (!root || root.val === val) {
            return root;
        }

        if (root.val < val) {
            return this.search(root.right, val);
        }

        return this.search(root.left, val);
    }

    inorderRecursive(node) {
        if (!node) return;
        this.inorderRecursive(node.left);
        console.log(node.val);
        this.inorderRecursive(node.right);
    }

    inorderIterative() {
        if (!this.root) return;

        const stack = [];

        let curr = this.root;

        while (curr || stack.length > 0) {
            while (curr) {
                stack.push(curr);
                curr = curr.left;
            }

            curr = stack.pop();

            console.log(curr.val);

            curr = curr.right;
        }
    }

    preorderRecursive(node) {
        if (!node) return;
        console.log(node.val);
        this.preorderRecursive(node.left);
        this.preorderRecursive(node.right);
    }

    preorderIterative() {
        if (!this.root) return;

        const stack = [];
        let curr = this.root;
        stack.push(curr);

        while (stack.length > 0) {
            curr = stack.pop();
            console.log(curr.val);
            if (curr.right) stack.push(curr.right);
            if (curr.left) stack.push(curr.left);
        }
    }

    postorderRecursive(node) {
        if (!node) return;
        this.postorderRecursive(node.left);
        this.postorderRecursive(node.right);
        console.log(node.val);
    }

    breadthFirstQueue(node) {
        if (!node) return;

        const queue = [];

        queue.push(node);

        while (queue.length > 0) {
            const n = queue.shift();
            console.log(n.val);
            if (n.left) queue.push(n.left);
            if (n.right) queue.push(n.right);
        }
    }

    breadthFirstStack(node) {
        if (!node) return;

        const stack = [];

        stack.push(node);

        while (stack.length > 0) {
            const n = stack.pop();
            console.log(n.val);
            if (n.right) stack.push(n.right);
            if (n.left) stack.push(n.left);
        }
    }

    invert(node) {
        if (!node) return node;

        const left = this.invert(node.left);
        const right = this.invert(node.right);

        node.right = left;
        node.left = right;

        return node;
    }

    min(node) {
        if (!node) return node;

        let curr = node;

        while (curr.left) {
            curr = curr.left;
        }

        return curr;
    }

    delete(val) {
        this.root = deleteHelper(this.root, val);
    }

    deleteHelper(root, val) {
        if (!root) return root;

        if (val < root.val) {
            root.left = this.deleteHelper(root.left, val);
        } else if (val > root.val) {
            root.right = this.deleteHelper(root.right, val);
        } else {
            if (!root.left) {
                return root.right;
            } else if (!root.right) {
                return root.left;
            }

            root.val = this.min(root.right).val;

            root.right = this.deleteHelper(root.right, root.val);
        }

        return root;
    }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(4);
bst.insert(12);
bst.insert(6);
bst.insert(5);
// console.log(bst.root);
// console.log(bst.search(bst.root, 5));

// bst.inorderRecursive(bst.root);
// bst.inorderIterative();
// bst.preorderRecursive(bst.root);
// bst.preorderIterative();
// bst.postorderRecursive(bst.root);
// bst.breadthFirstQueue(bst.root);
// bst.invert(bst.root);
// bst.breadthFirstQueue(bst.root);
// bst.breadthFirstStack(bst.root);
console.log(bst.min());
