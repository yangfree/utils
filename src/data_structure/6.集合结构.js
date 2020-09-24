/**
 * JS实现集合结构
 *  add(value): 添加新元素
 *  remove(value): 从集合中移除一个值
 *  has(value): 查看集合中是否存在 存在返回true 否则返回false
 *  clear(): 移除集合中的所有项
 *  size(): 返回集合中所包含元素的数量
 *  values(): 返回包含集合中所有值的数组
 * 
 * @Author: Jie.Yang
 * @Date: 2020-09-24
 */
class Set {
    constructor() {
        this.items = {}
    }

    add(value) {
        // 判断集合中是否存在添加元素
        if (this.has(value)) {
            return false
        }
        this.items[value] = value
        return true
    }

    has(value) {
        return this.items.hasOwnProperty(value)
    }

    remove(value) {
        if (!this.has(value)) {
            return false
        }

        delete this.items[value]
        return true
    }

    clear() {
        this.items = {}
    }

    size() {
        return Object.keys(this.items).length
    }

    values() {
        return Object.keys(this.items)
    }

    // 1. 并集 存在A中或者存在于B中的元素集合
    union(otherSet) {
        let unionSet = new Set()

        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        values = otherSet.values()
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        return unionSet
    }

    // 2.交集  既存在A中也存在B中的元素集合
    intersection(otherSet) {
        let intersection = new Set()

        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersection.add(values[i])
            }
        }

        return intersection
    }

    // 3. 差集 元素存在A中且不能存在于B中
    difference(otherSet) {
        let difference = new Set()

        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            const item = values[i];
            if (!otherSet.has(item)) {
                difference.add(item)
            }
        }

        return difference
    }

    // 4. 子集 集合A中存在的每一个元素也需要存在集合B中
    subset(otherSet) {
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            const item = values[i];
            if (!otherSet.has(item)) {
                return false
            }

            return true
        }
    }
}

let s1 = new Set()
s1.add(('abc'))
s1.add(('nbc'))
s1.add(('cba'))
s1.add(('ppp'))
let s2 = new Set()
s2.add('cba')
s2.add('ppp')

console.log(s2.subset(s1))