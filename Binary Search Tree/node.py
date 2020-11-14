class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def inorder(root):
    if root is not None:
        inorder(root.left)

        print(str(root.value) + "->", end=" ")

        inorder(root.right)


def postorder(root):
    if root is not None:
        postorder(root.left)

        postorder(root.right)

        print(str(root.value) + "->", end=" ")


def preorder(root):
    if root is not None:
        print(str(root.value) + "->", end=" ")

        preorder(root.left)

        preorder(root.right)


def insert(node, value):
    if node is None:
        return Node(value)

    if value < node.value:
        node.left = insert(node.left, value)
    else:
        node.right = insert(node.right, value)

    return node


def minValue(node):
    current = node

    while (current.left is not None):
        current = current.left

    return current


def deleteNode(root, value):
    if root is None:
        return root

    if value < root.value:
        root.left = deleteNode(root.left, value)
    elif value > root.value:
        root.right = deleteNode(root.right, value)
    else:
        if root.left is None:
            temp = root.right
            root = None
            return temp
        elif root.right is None:
            temp = root.left
            root = None
            return temp

        temp = minValue(root.right)

        root.value = temp.value

        root.right = deleteNode(root.right, temp.value)

    return root


root = None
root = insert(root, 8)
root = insert(root, 3)
root = insert(root, 1)
root = insert(root, 6)
root = insert(root, 10)
root = insert(root, 14)

inorder(root)

print()

print(minValue(root).value)

print()

root = deleteNode(root, 8)

inorder(root)

print()

print(root.value)
