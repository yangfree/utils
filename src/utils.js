/**
 * Solve the problem: 格式化时间 
 * @param {String: date}
 * @return 2019-10-28 16:44:30 (格式化后的时间字符串)
 * 
 */
function formatDate(date) {
    if (date && typeof date === 'string') {
        date = date.replace(/(-|\.)/g, '/');
        date = new Date(date);
    } else {
        const promptMst = '"2019-1-12 12:2:23"';
        throw TypeError(`Must be a String like ${promptMst}`);
    }

    function zero(val) {
        return val < 10 ? '0' + val : val;
    }
    const formatDate = {
        year: date.getFullYear() + '-',
        mon: zero(date.getMonth() + 1) + '-',
        day: zero(date.getDate()) + ' ',
        hour: zero(date.getHours()) + ':',
        minute: zero(date.getMinutes()) + ':',
        senc: zero(date.getSeconds())
    };

    return formatDate.year + formatDate.mon + formatDate.day +
        formatDate.hour + formatDate.minute + formatDate.senc;
}

/**
 * Solve the problem: 对象深度克隆
 * @param: [Object source]
 * @return newObject
 *
 */
function objDeepCopy(source) {
    let sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
        if (source.hasOwnProperty(item)) {
            sourceCopy[item] = typeof source[item] === 'object' ?
                objDeepCopy(source[item]) : source[item];
        }
    }
    return sourceCopy;
};

/**
 * Solve the problem: 判断js执行环境
 * @param: window
 * @return String
 *
 * */
function isJavaScript() {
    if (typeof (window) === "undefined") {
        return "Node";
    }

    return "Browser";
}

/**
 * Solve the problem: 获取通用查询字符串参数
 *  @param: null
 *  @return Object
 * 
 */
function getQueryStringArgs() {
    var qs = location.search.length > 0 ? location.search.substring(1) : "",
        args = {},
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;

    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(items[0]);
        value = decodeURIComponent(items[1]);

        if (name.length) {
            args[name] = value;
        }
    }

    return args;
}

/**
 * Solve the problem: 获取随机数字+字母组成的n位验证码
 * @param {n} Number    参数是位数
 * @return {tem} String  返回随机字符串
 */
function randomString(n) {
    let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
    let tmp = '',
        i = 0,
        l = str.length;
    for (i = 0; i < n; i++) {
        tmp += str.charAt(Math.floor(Math.random() * l));
    }
    return tmp;
}

/**
 * Solve the problem: 获取随机数字+字母组成的n位验证码
 * @param {len} Number 参数是位数
 * @return {str} String 返回随机后的字符串
 */
function getRandomStr(len) {
    var str = "";
    for (; str.length < len; str += Math.random().toString(36).substr(2));
    return str.substr(0, len);
}


/**
 * Solve the problem: 获取字符串中出现次数最多的字母和出现的次数
 *
 * @param {str} 传入的字符串
 * @return {Object} 返回出现最多的字母和出现的次数
 */
function getStr(str) {
    if (typeof str !== 'string') return false

    let obj = {}
    let arr = str.split('')

    for (let i = 0; i < arr.length; i++) {
        let char = arr[i]
        obj[char] = obj[char] || 0
        obj[char] += 1
    }

    let maxChar
    let maxNum = 0

    for (let key in obj) {
        if (obj[key] > maxNum) {
            maxChar = key
            maxNum = obj[key]
        }
    }
    return { maxChar, maxNum }
}


