/**
 * 字典JS实现
 *  set(key,value): 在字典中添加键值对
 *  has(key): 判断字典中是否有某个key
 *  remove(key): 从字典中移除元素
 *  get(key): 根据key获取value
 *  keys(): 获取所有的keys
 *  values(): 获取所有的value
 *  size(): 获取长度
 *  clear(): 清空
 * 
 * @Author: Jie.Yang
 * @Date: 2020-09-21
 */
class Dictionary {
    constructor() {
        this.items = {}
    }

    set(key, value) {
        this.items[key] = value
    }

    has(key) {
        return this.items.hasOwnProperty(key)
    }

    remove(key) {
        if (!this.has(key)) return false

        delete this.items[key]
        return true
    }

    get(key) {
        return this.has(key) ? this.items[key] : undefined
    }

    keys() {
        return Object.keys(this.items)
    }

    values() {
        return Object.values(this.items)
    }

    size() {
        return this.keys().length
    }

    clear() {
        this.items = {}
        return true
    }

}

module.exports = { Dictionary }