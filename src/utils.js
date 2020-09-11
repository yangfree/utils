/**
 * Solve the problem: 格式化时间 
 * @param {String: date}
 * return 2019-10-28 16:44:30 (格式化后的时间字符串)
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
 * return newObject
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
 * Soleve the problem: 判断js执行环境
 * @param: window
 * return String
 *
 * */
function isJavaScript() {
    if (typeof (window) === "undefined") {
        return "Node";
    }

    return "Browser";
}

/**
 * Soleve the problem: 获取通用查询字符串参数
 *  @param: null
 *  return Object
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







