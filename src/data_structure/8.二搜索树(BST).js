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
}

let b = new BinarySearchTree()

// b.insert(11)
// b.insert(7)
// b.insert(15)
// b.insert(5)
// b.insert(3)

// b.insert(9)
// b.insert(8)
// b.insert(10)
// b.insert(13)
// b.insert(12)

// b.insert(14)
// b.insert(20)
// b.insert(18)
// b.insert(25)
// b.insert(6)

// console.log(b)

// let res1 = ''
// b.preOrderTraversal((key) => {
//     res1 += key + ' '
// })
// console.log('先序遍历', res1)

// let res2 = ''
// b.midOrderTraversal((key) => {
//     res2 += key + ' '
// })
// console.log('中序遍历', res2)

// let res3 = ''
// b.postOrderTraversal((key) => {
//     res3 += key + ' '
// })
// console.log('后序遍历', res3)

console.log('最大值', b.max())
console.log('最小值', b.min())
