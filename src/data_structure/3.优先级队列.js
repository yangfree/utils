/**
 * 优先级队列实现(基于数组/基于链表)
 *  优先级队列和队列主要是在插入的时候
 *  所以我们重写enqueue(ele,priority)方法
 *  
 *  Class QueueElement初始化类,保存数据和优先级
 *  Class PriorityQueue优先级队列
 *
 * @Author: Jie.Yang
 * @Date: 2020-09-22
 */
class QueueElement {
    constructor(element, priority) {
        this.element = element
        this.priority = priority
    }
}

class PriorityQueue {
    constructor() {
        this.items = []
    }

    enqueue(element, priority) {
        // 1. 初始化插入对象
        let queueElement = new QueueElement(element, priority)

        // 2. 判断当前队列是否存在元素,存在比较,不存在直接插入
        if (this.items.length === 0) {
            this.items.push(queueElement)
        } else {
            // 3. 设置标识符,全部比较完成后没有符合条件的直接退出循环
            let added = false
            for (let i = 0; i < this.items.length; i++) {
                if (queueElement.priority < this.items[i].priority) {
                    // 4. 找到合适的,改变标识符并且直接跳出循环
                    this.items.splice(i, 0, queueElement)
                    added = true
                    break
                }
            }

            // 5. 结束
            if (!added) {
                this.items.push(queueElement)
            }
        }
    }
}