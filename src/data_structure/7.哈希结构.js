/**
 * @Author: Jie.Yang
 * @Date: 2020-09-24
 */

// -------------------------------------------------------------------------------------------------------
/**
 * 设计hash函数
 *  1> 将字符串转变成比较大的数字.hashcode
 *  2> 将大的数字hashcode压缩到数组的范围(大小)之内 
 */
function hashFunc(str, size) {
    let hashCode = 0
    // 霍纳法则计算hashcode的值
    for (let i = 0; i < str.length; i++) {
        hashCode = 37 * hashCode + str.charCodeAt(i)
    }
    // 取余操作
    let index = hashCode % size
    return index
}

/**
 * JS实现哈希表结构->链地址法
 */
class HashTable {
    constructor() {
        this.storage = []
        this.count = 0
        this.limit = 7
    }

    // 插入和修改操作
    put(key, value) {
        // 1. 根绝key获取对应的index
        let index = hashFunc(key, this.limit)

        // 2. 根据index取出bucket
        let bucket = this.storage[index]

        // 3. 判断bucket是否为null
        if (bucket == null) {
            bucket = []
            this.storage[index] = bucket
        }

        // 4. 判断是否是修改数据
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] === key) {
                tuple[1] = value
                return
            }
        }

        // 5. 进行添加操作
        bucket.push([key, value])
        this.count += 1

        // 6.判断是否需要扩容
        if (this.count > this.limit * 0.75) {
            let newSize = this.limit * 2
            let newPrime = this.getPrime(newSize)
            this.resize(newPrime)
        }
    }

    // 获取操作
    get(key) {
        let index = hashFunc(key, this.limit)
        let bucket = this.storage[index]

        if (bucket == null) {
            return null
        }

        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] === key) {
                return tuple[1]
            }
        }

        return null
    }

    // 删除操作
    remove(key) {
        let index = hashFunc(key, this.limit)
        let bucket = this.storage[index]

        if (bucket == null) {
            return null
        }

        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] === key) {
                bucket.splice(i, 1)
                this.count--

                // 缩小容量
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    let newSize = Math.floor(this.limit / 2)
                    let newPrime = this.getPrime(newSize)
                    this.resize(newPrime)
                }

                return tuple[1]
            }
        }

        return null
    }

    // 判断hash表是否为空
    isEmpty() {
        return this.count === 0
    }

    // 获取hash表中元素的个数
    size() {
        return this.count
    }


    // hash表的扩容
    resize(newLimit) {
        // 1. 保存旧数组内容
        let oldStorange = this.storage

        // 2. 重置所有属性
        this.storage = []
        this.count = 0
        this.limit = newLimit

        // 3. 遍历之前oldStorage所有的bucket
        for (let i = 0; i < oldStorange.length; i++) {
            let bucket = oldStorange[i];
            if (bucket == null) {
                continue
            }

            // 4. 循环每项中取出数据重新插入
            for (let j = 0; j < bucket.length; j++) {
                let tuple = bucket[j];
                this.put(tuple[0], tuple[1])
            }
        }
    }

    // 判断某个数字是否是质数
    isPrime(num) {
        let temp = parseInt(Math.sqrt(num))

        for (let i = 2; i <= temp; i++) {
            if (num % i === 0) {
                return false
            }
        }

        return true
    }

    // 获取质数的方法
    getPrime(num) {
        while (!this.isPrime(num)) {
            num += 1
        }

        return num
    }
}



// 质数函数

// function isPrime(num) {
//     for (let i = 2; i < num; i++) {
//         if (num % i === 0) {
//             return false
//         }
//     }
//     return true
// }

// function isPrime(num) {
//     let temp = parseInt(Math.sqrt(num))

//     for (let i = 2; i <= temp; i++) {
//         if (num % i === 0) {
//             return false
//         }
//     }

//     return true
// }