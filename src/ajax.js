/**
 * 全局axios封装,每个请求都继承,默认导出AjaxRequest的实例
 *      @CLass AjaxRequest
 *      @Attribute queue 记录每次请求的次数,针对多次请求只执行一次.Loading时候可用
 *      @function  _merge 合并类和每个实例传递进来的参数
 *      @function  _setInterceptor 全局请求拦截
 *      @Function  对外暴露的方法,供实例调用
 *
 * Auth: Jie
 * Date: 2020-07-07
 */

import axios from "axios";

class AjaxRequest {
    constructor() {
        this.baseURL =
            process.env.NODE_ENV === "development"
                ? "http://127.0.0.1:8080/doctor/v2"
                : "https://hdmp.hdzyhosp.com/doctor/v2";
        this.timeout = 5000;
        this.queue = {};
    }

    _merge(options) {
        return { ...options, baseURL: this.baseURL, timeout: this.timeout };
    }

    _setInterceptor(instance, url) {
        instance.interceptors.request.use(
            config => {
                if (!config.headers["Content-Type"]) {
                    config.headers["Content-Type"] = "application/json";
                }
                if (Object.keys(this.queue).length === 0) {
                    // TODO: something...
                }
                this.queue[url] = url;
                return config;
            },
            error => {
                console.log(error);
            }
        );
        instance.interceptors.response.use(
            res => {
                delete this.queue[url];
                if (Object.keys(this.queue).length === 0) {
                    // TODO: something...
                }
                let status = res.status.toString().slice(0, 1);
                switch (status) {
                    case "2":
                        return res.data;
                    case "3":
                        return "资源重定向";
                    case "4":
                        return "客户端错误";
                    case "5":
                        return "服务端错误";
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    request(options) {
        const instance = axios.create();
        this._setInterceptor(instance, options.url);
        let config = this._merge(options);
        return instance(config);
    }
}

export default new AjaxRequest();
