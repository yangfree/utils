/**
 * 栈结构JS实现
 *  push(ele): 添加新元素
 *  pop(): 移除栈顶的元素,同时返回被移除元素
 *  peek(): 返回栈顶元素(查看)
 *  isEmpty(): 是否为空,是返回true,否false
 *  size(): 返回栈里的元素个数
 *  toString(): 将栈结构内容以字符串形式返回
 * 
 * @Author: Jie.Yang
 * @Date: 2020-09-21
 */
class Stack {
    constructor() {
        this.items = []
    }

    push(element) {
        this.items.push(element)
    }
    pop() {
        return this.items.pop()
    }
    peek() {
        return this.items[this.items.length - 1]
    }
    isEmpty() {
        return this.items.length === 0
    }
    size() {
        return this.items.length
    }
    toString() {
        let resultString = '';
        for (let i = 0; i < this.items.length; i++) {
            resultString += this.items[i] + ' '
        }
        return resultString
    }
}

/**
 * 十进制转二进制
 *  1.传入一个十进制参数,边界判断
 *  2.获取余数压入到栈
 *  3.获取整数结果继续进行下一次运算
 */
function dec2bin(decNumber) {
    let stack = new Stack()

    while(decNumber > 0) {
        stack.push(decNumber % 2)
        decNumber = Math.floor(decNumber/2)
    }

    let binaryString = ''
    while(!stack.isEmpty()) {
        binaryString += stack.pop()
    }
    return binaryString
}