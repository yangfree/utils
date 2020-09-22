/**
 * 队列结构JS实现(基于数组/基于链表)
 *  enqueue(ele): 添加新元素
 *  dequeue(): 删除元素
 *  front(): 返回第一个元素(查看)
 *  isEmpty(): 是否为空,是返回true,否false
 *  size(): 返回栈里的元素个数
 *  toString(): 将栈结构内容以字符串形式返回
 *
 * @Author: Jie.Yang
 * @Date: 2020-09-22
 */
class Queue {
    constructor() {
        this.items = []
    }

    enqueue(element) {
        this.items.push(element)
    }
    dequeue() {
        return this.items.shift()
    }
    front() {
        return this.items[0]
    }
    isEmpty() {
        return this.items.length === 0
    }
    size() {
        return this.items.length
    }
    toString() {
        let resultString = ''
        for (let i = 0; i < this.items.length; i++) {
            resultString += this.items[i] + ' '
        }
        return resultString
    }
}

/**
 * 击鼓传花规则和实现
 */