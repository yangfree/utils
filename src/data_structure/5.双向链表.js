/**
 * 链表结构JS实现
 *  append(element): 向链表尾部添加新的项
 *  insert(position,element):向链表特定位置插入一个新项
 *  get(position): 根据传入的索引获取相应位置的元素
 *  indexOf(element): 返回元素在链表中的索引,如果没有返回-1
 *  update(position,element): 修改某个位置的元素
 *  removeAt(position): 从链表的特定位置移除一项
 *  remove(element): 从链表中移除一项
 *  isEmpty(): 是否为空,是返回true,否false
 *  size(): 返回链表里的元素个数
 *  toString(): 输出元素的值
 *  forwardString(): 返回从尾到头遍历的节点字符串形式
 *  backwardString(): 返回从头到尾遍历的节点字符串形式
 *  getHead(): 获取第一个元素
 *  getTail(): 获取最后一个元素
 *
 * @Author: Jie.Yang
 * @Date: 2020-09-22
 */
class Node {
    constructor(data) {
        this.data = data
        this.prev = null
        this.next = null
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    append(data) {
        let newNode = new Node(data)

        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            /**
             * 原来的节点 = this.tail
             * newNode.prev = 原来最后一个节点
             * 原来最后一个节点.next = newNode
             * 最后改变this.tail指针指向newNode
             */
            newNode.prev = this.tail
            this.tail.next = newNode
            this.tail = newNode
        }

        this.length += 1
    }

    insert(position, data) {
        // 1. 范围判断
        if (position < 0 || position > this.length) return false
        // 2. 创建新的节点
        let newNode = new Node(data)
        // 3. 判断原来的链表是否为空
        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            // 4. 插入第一个位置
            if (position === 0) {
                /**
                 * 原来的节点 = this.head
                 * 原来的第一个节点.prev = newNode
                 * newNode.next = 原来的节点
                 */
                this.head.prev = newNode
                newNode.next = this.head
                this.head = newNode
            } else if (position === this.length) {
                // 5. 插入到最后
                newNode.prev = this.tail
                this.tail.next = newNode
                this.tail = newNode
            } else {
                // 6. 中间某个地方插入
                let current = this.head, index = 0;
                while (index < position) {
                    current = current.next
                    index++
                }

                // 7.修改指针
                newNode.next = current
                newNode.prev = current.prev
                current.prev.next = newNode
                current.prev = newNode
            }
        }

        // 8. 修改length
        this.length += 1
        return true

    }

    get(position) {
        if (position < 0 || position >= this.length) return null

        // 提高效率 这边可以提取为一个简单的二分查找
        if (this.length / 2 > position) {
            let current = this.head, index = 0;
            while (index < position) {
                current = current.next
                index++
            }
            return current.data
        } else {
            let current = this.tail, index = this.length - 1;
            while (index > position) {
                current = current.prev
                index--
            }
            return current.data
        }
    }

    indexOf(data) {
        let current = this.head, index = 0;
        while (current) {
            if (current.data === data) {
                return index
            }
            current = current.next
            index += 1
        }

        return -1
    }

    update(position, newData) {
        if (position < 0 || position >= this.length) return false
        let current = this.head, index = 0;
        while (index < position) {
            current = current.next
            index++
        }
        current.data = newData
        return true
    }

    removeAt(position) {
        // 1. 范围判断
        if (position < 0 || position >= this.length) return null
        // 2. 整个链表只有一个节点的情况
        let current = this.head
        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            // 3. 链表多个节点 删除第一个
            if (position === 0) {
                this.head.next.prev = null
                this.head = this.head.next
            } else if (position === this.length - 1) {
                current = this.tail
                this.tail.prev.next = null
                this.tail = this.tail.prev
            } else {
                let index = 0;
                while (index < position) {
                    current = current.next
                    index++
                }

                current.prev.next = current.next
                current.next.prev = current.prev
            }
        }

        // 4. length
        this.length -= 1
        return current.data
    }

    remove(data) {
        let index = this.indexOf(data)
        return this.removeAt(index)
    }

    isEmpty() {
        return this.length === 0
    }

    size() {
        return this.length
    }

    toString() {
        return this.backwardString()
    }

    forwardString() {
        let current = this.tail
        let resultString = ""

        while (current) {
            resultString += current.data + " "
            current = current.prev
        }

        return resultString
    }

    backwardString() {
        let current = this.head
        let resultString = ""

        while (current) {
            resultString += current.data + " "
            current = current.next
        }

        return resultString
    }

    getHead() {
        return this.head
    }

    getTail() {
        return this.tail
    }

}