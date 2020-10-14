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
const Dictionay = require('./10.字典')

class Graph {
    constructor() {
        // 数组存顶点  
        this.vertexes = []
        // 字典存边
        this.edges = new Dictionay()
    }
}
