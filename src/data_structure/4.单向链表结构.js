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
 *
 * @Author: Jie.Yang
 * @Date: 2020-09-22
 */
class Node {
    constructor(data) {
        // 数据和指向下一个节点的指针
        this.data = data
        this.next = null
    }
}

class LinkedList {
    constructor() {
        // 记录链表的开始
        this.head = null
        // 记录链表的长度
        this.length = 0
    }

    append(data) {
        let newNode = new Node(data)
        // 1. 判断添加的是否是第一个节点
        if (this.length === 0) {
            this.head = newNode
        } else {
            // 2. 循环找到最后一个节点,让后让其next指向新加项
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = newNode
        }

        // 3. length+1
        this.length += 1
    }

    toString() {
        // 1. 定义当前项和返回结果变量
        let current = this.head
        let listString = ""

        // 2. 循环拼接内容
        while (current) {
            listString += current.data + " "
            current = current.next
        }

        return listString
    }

    insert(position, data) {
        // 1. 进行越界判断,对于最大和最小的位置判断
        if (position < 0 || position > this.length) return false
        // 2. 根据data创建插入元素 
        let newNode = new Node(data)
        // 3.1 插入到第一个
        if (position === 0) {
            newNode.next = this.head
            this.head = newNode
        } else {
            // 3.2 插入到其他位置
            let index = 0, current = this.head, previous = null;
            while (index++ < position) {
                previous = current
                current = current.next
            }

            newNode.next = current
            previous.next = newNode
        }
        // 4. length加一并且返回添加成功
        this.length += 1
        return true
    }

    get(position) {
        // 1. 进行越界判断,对于最大和最小的位置判断
        if (position < 0 || position >= this.length) return null
        let current = this.head, index = 0;
        while (index < position) {
            current = current.next
            index++
        }

        return current.data
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

        // 没有找到返回-1
        return -1
    }

    update(position, newData) {
        // 1. 进行越界判断,对于最大和最小的位置判断
        if (position < 0 || position >= this.length) return false
        // 2. 查找正确的节点
        let current = this.head, index = 0;
        while (index < position) {
            current = current.next
            index++
        }
        // 3. 修改对应元素
        current.data = newData
        return true
    }

    removeAt(position) {
        // 1. 进行越界判断,对于最大和最小的位置判断
        if (position < 0 || position >= this.length) return null
        let current = this.head
        // 2. 是否删除的是第一个节点
        if (position === 0) {
            this.head = this.head.next
        } else {
            // 3. 不是第一个节点,让上一个节点的next指向current的next即可
            let index = 0, previous = null;
            while (index < position) {
                previous = current
                current = current.next
                index++
            }
            previous.next = current.next
        }
        // 4. 删除后length减一
        this.length -= 1
        return current.data
    }

    remove(data) {
        // 1. 获取data在列表中的位置
        let position = this.indexOf(data)
        // 2. 根据位置信息,删除节点
        return this.removeAt(position)
    }

    isEmpty() {
        return this.length === 0
    }
    size() {
        return this.length
    }
}