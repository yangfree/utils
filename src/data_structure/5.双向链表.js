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
 *  forwardString(): 返回正向遍历的节点字符串形式
 *  backwardString(): 返回反向遍历的节点字符串形式
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

    append() {
        
    }
}