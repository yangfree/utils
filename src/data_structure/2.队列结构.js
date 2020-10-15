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
 * 击鼓传花实现:
 *   @param: 人数列表
 *   @param: 要数的数字
 *   @return 返回最后剩余的人 
 */
function passGame(nameList, number) {
    let queue = new Queue()

    // 1. 依次进入队列
    for (let i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i])
    }

    // 2. 开始数数字,当队列中数字大于1的时候
    while (queue.size() > 1) {
        for (let i = 0; i < number - 1; i++) {
            // 3. 不是这个数字的人从队列前端删除放入到队列末尾
            queue.enqueue(queue.dequeue())
        }

        // 4. 数到number的人直接从队列中删除掉
        queue.dequeue()
    }

    // 5. 返回所在原来列表中的下标
    return queue.front()
}

module.exports = Queue