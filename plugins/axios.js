// import { Toast } from "vant"; // 处理请求错误
// import Cookie from "js-cookie";
// nuxt中引入的写法
import qs from "qs";
// { $axios, store, app, redirect } 来自nuxt中的上下文对象 context
export default function({ $axios, store, app, redirect }) {
  // 配置请求头
  $axios.defaults.timeout = 10000; // 超时时间
  // $axios.defaults.headers.post["content-Type"] =
  //   "application/x-www-form-urlencoded";
  // $axios.defaults.transformRequest = function(data) {
  //   return qs.stringify(data);
  // };

  // console.log("请求头信息", $axios.defaults.headers);

  // 配置一些公共请求参数什么的
  $axios.onRequest(config => {
    // console.log(config, "请求参数"); // 存放的请求类型 时间什么的
    // console.log(store, "结构树");
    switch (config.method) {
      case "post":
        // headers里的content-Type和Content-Type在请求时都会整合到一起
        config.headers["content-Type"] =
          "application/x-www-form-urlencoded;charset=UTF-8";
        config.data = qs.stringify(config.data); // 转化为没有"{}"（引号和括号）的键值对
        break;
    }
    console.log(config, "请求参数");
    return config;
  });

  //asyncData中的统一请求  返回一个promise对象
  $axios.all = function(promise) {
    return Promise.all(promise);
  };

  //asyncData对统一请求后的返回参数 做区别处理
  $axios.spread = function(callback) {
    return function(arg) {
      return callback.apply(null, arg);
    };
  };

  // 请求失败
  $axios.onError(error => {
    console.log(`请求失败${error}`);
    // Toast("请求失败");
  });

  // 为返回做统一处理
  $axios.onResponse(res => {});
}
