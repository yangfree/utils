const PENDING = "PENDING"
const RESOLVED = "RESOLVED"
const REJECTED = "REJECTED"

const resolvePromise = (promise2, x, resolve, reject) => {
    // 判断x的值和promise2是否是同一个值,是同一个值直接报错
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected form promise #<Promise>'))
    }
    if ((typeof x === 'object' && typeof x !== null) || typeof x === 'function') {
        // 调用flag 防止多次调用
        let called = false;

        try {
            let then = x.then

            if (typeof then === 'function') {
                then.call(x,
                    y => {
                        if (called) {
                            return false
                        }
                        called = true
                        // y有可能是一个promise, 所以递归调用直到解析出来普通值为止
                        resolvePromise(promise2, y, resolve, reject)
                    }, r => {
                        if (called) {
                            return false
                        }
                        called = true
                        reject(r)
                    }
                )
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) {
                return false
            }
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        // 初始状态 成功与失败传递的值
        this.status = PENDING
        this.value = undefined
        this.reason = undefined

        // 成功和失败回调的数组
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        // 成功和失败的函数
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        // 默认执行器会立刻执行,如果执行发生错误,等价于调用reject方法 处理同步错误
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    // then方法目前有两个参数
    then(onfulfilled, onrejected) {
        //onfulfilled onrejected是可选参数
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val;
        onrejected = typeof onrejected === 'function' ? onrejected : err => {
            throw err
        }

        // 为了实现链式调用
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                // 宏任务  为了保证promise2已经new完
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value)
                        // x可能是普通值 可能是promise
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            // 处理异步情况
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    // todo...
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    // todo...
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })

        return promise2
    }

    // ==================================================================
    // finally 无论成功或者失败都会执行
    // finally(cb) {
    //     let p = new Promise();
    //     return p.then(
    //         data => {
    //             return Promise.resolve(cb()).then(() => data)
    //             // cb();
    //             // return data;
    //         },
    //         err => {
    //             return Promise.resolve(cb()).then(() => {
    //                 throw err
    //             })
    //             // cb();
    //             // throw err;
    //         }
    //     )
    // }

    // isPromise(value) {
    //     if ((typeof value === 'object' && typeof value !== null) || typeof value === 'function') {
    //         if (typeof value.then === 'function') {
    //             return true
    //         }
    //     } else {
    //         return false
    //     }
    // }

    // static all(values) {
    //     return new Promise((resolve, reject) => {
    //         let arr = []
    //         index = 0

    //         function processData(key, value) {
    //             arr[key] = value
    //             if (++index === values.length) {
    //                 resolve(arr)
    //             }
    //         }

    //         for (let i = 0; i < values.length; i++) {
    //             let current = values[i]
    //             if (isPromise(current)) {
    //                 current.then(data => {
    //                     processData(i, data)
    //                 }, reject)
    //             } else {
    //                 processData(i, current)
    //             }

    //         }
    //     })
    // }
    // ==================================================================
}

// ----------------------------------------------------------------------
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise