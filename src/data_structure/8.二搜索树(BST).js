/**
 * 二叉搜索树
 *  insert(key): 向树中插入一个新的键
 *  search(key): 在树中查找一个键,如果节点存在,则返回true,如不存在则返回false
 *  midOrderTraversal: 通过中序遍历方式遍历所有节点
 *  preOrderTraversal: 通过先序遍历方式遍历所有节点
 *  postOrderTraversal: 通过后序遍历方式遍历所有节点
 *  min: 返回树中最小的值/键
 *  max: 返回树中最大的值/键
 *  remove(key): 从树中移除某个键
 * 
 * @Author: Jie.Yang
 * @Date: 2020-09-24
 */
class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(key) {
        // 1. 根据key创建节点
        let newNode = new Node(key)
        // 2. 判断根节点是否有值
        if (this.root == null) {
            this.root = newNode
        } else {
            this._insertNode(this.root, newNode)
        }
    }
    // 插入递归方法
    _insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left == null) {
                node.left = newNode
            } else {
                this._insertNode(node.left, newNode)
            }
        } else {
            if (node.right == null) {
                node.right = newNode
            } else {
                this._insertNode(node.right, newNode)
            }
        }
    }

    preOrderTraversal(handler) {
        this._preOrderTraversalNode(this.root, handler)
    }
    // 先序排序递归方法
    _preOrderTraversalNode(node, handler) {
        if (node != null) {
            // 先处理节点所以叫先序
            handler(node.key)

            // 处理左子节点
            this._preOrderTraversalNode(node.left, handler)
            // 处理右子节点
            this._preOrderTraversalNode(node.right, handler)
        }
    }

    midOrderTraversal(handler) {
        this._midOrderTraversalNode(this.root, handler)
    }
    // 中序排序递归方法
    _midOrderTraversalNode(node, handler) {
        if (node != null) {
            // 处理左子节点
            this._midOrderTraversalNode(node.left, handler)
            // 处理节点
            handler(node.key)
            // 处理右子节点
            this._midOrderTraversalNode(node.right, handler)
        }
    }

    postOrderTraversal(handler) {
        this._postOrderTraversalNode(this.root, handler)
    }
    _postOrderTraversalNode(node, handler) {
        if (node != null) {
            // 处理左子节点
            this._midOrderTraversalNode(node.left, handler)
            // 处理右子节点
            this._midOrderTraversalNode(node.right, handler)
            // 处理节点
            handler(node.key)
        }
    }

    max() {
        let node = this.root
        let key = null

        while (node != null) {
            key = node.key
            node = node.right
        }

        return key
    }

    min() {
        let node = this.root
        let key = null

        while (node != null) {
            key = node.key
            node = node.left
        }

        return key
    }

    search(key) {
        return this._searchNode(this.root, key)
    }
    _searchNode(node, key) {
        // 1. 如果传进去的node为null
        if (node == null) {
            return false
        }

        // 2. 判断node节点的值和传入key的大小
        if (node.key > key) {
            return this._searchNode(node.left, key)
        } else if (node.key < key) {
            return this._searchNode(node.right, key)
        } else {
            return true
        }
    }

    remove(key) {
        // 1. 寻找要删除的节点
        let current = this.root
        let parent = null
        let isLeftChild = true

        while (current.key != key) {
            parent = current

            if (key < current.key) {
                isLeftChild = true
                current = current.left
            } else {
                isLeftChild = false
                current = current.right
            }

            // 找完之后依然没有找到相对应的节点
            if (current == null) return false
        }

        /**
         *  2. 根据对应的情况删除节点
         *     2.1 删除的是叶子节点
         *     2.2 删除的是有一个子节点
         *     2.3 删除的是有两个的子节点
         */
        if (current.left == null && current.right == null) {
            if (current == this.root) {
                this.root = null
            } else if (isLeftChild) {
                parent.left = null
            } else {
                parent.right = null
            }
        } else if (current.right == null) {
            if (current == this.root) {
                this.root = current.left
            } else if (isLeftChild) {
                parent.left = current.left
            } else {
                parent.right = current.left
            }
        } else if (current.left == null) {
            if (current === this.root) {
                this.root = current.right
            } else if (isLeftChild) {
                parent.left = current.right
            } else {
                parent.right = current.right
            }
        } else {
            // 1. 获取后继节点
            let successor = this._getSuccssor(current)
            // 2. 判断是否是根节点
            if (current == this.root) {
                this.root = successor
            } else if (isLeftChild) {
                parent.left = successor
            } else {
                parent.right = successor
            }
            // 3. 将删除节点的左子树
            successor.left = current.left
        }
    }
    // 获取后继节点方法
    _getSuccssor(delNode) {
        let successor = delNode
        let current = delNode.right
        let successorParent = delNode

        while (current != null) {
            successorParent = successor
            successor = current
            current = current.left
        }

        // 判断寻找后继几点是否直接就是delNode的right节点
        if (successor != delNode.right) {
            successorParent.left = successor.right
            successor.right = delNode.right
        }

        return successor
    }
}
