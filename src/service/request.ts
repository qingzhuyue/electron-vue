/*
 * @Author: duxinyues weiyy26445@yunrong.cn
 * @Date: 2023-08-11 00:00:24
 * @LastEditors: duxinyues weiyy26445@yunrong.cn
 * @LastEditTime: 2023-08-24 00:50:33
 * @FilePath: /electron-vue/src/service/request.ts
 * @Description: 
 * Copyright (c) 2023 by ${duxinyues} email: ${weiyy26445@yunrong.cn}, All Rights Reserved.
 */
import axios from 'axios'
import config from '../config/index.js'
import { message } from 'ant-design-vue'
//错误提示
const NETWORK_ERROR = '网络请求异常,请稍后重试.....'


//创建axios实例对象service
const service=axios.create({
    //根路径为config里的index.js文件里的开发环境的baseApi
    baseURL:config.baseApi
})


//在请求之前做的一些事情，request
service.interceptors.request.use((req)=>{
    //可以自定义header
    //jwt-token认证的时候
    return req//需要return出去，否则会阻塞程序
})
 


//在请求之后做的一些事情，response
service.interceptors.response.use((res)=>{
    console.log(res)
    //解构res的数据
    const { code, data, msg } = res.data
     // 根据后端协商,视情况而定
    if (code == 200) {
    //返回请求的数据
    return data
  } else {
    // 网络请求错误
    message.error(msg || NETWORK_ERROR)
     // 对响应错误做点什么
    return Promise.reject(msg || NETWORK_ERROR)
  }
})



//封装的核心函数
function request(options:any){
    //默认为get请求
    options.methods=options.methods || 'get'
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data
      }

            // 对mock的处理
  let isMock = config.mock  //config的mock总开关赋值给isMock
  if (typeof options.mock !== 'undefined') { //若组件传来的options.mock 有值，单独对mock定义开关
    isMock = options.mock  //就把options.mock 的值赋给isMock
  }
   // 对线上环境做处理
   if (config.env == 'prod') {
    // 如果是线上环境，就不用mock环境，不给你用到mock的机会
    service.defaults.baseURL = config.baseApi
  } else {
    //ismock中开关是否为true,若为真，则说明事由mock环境，那么跟路径就要事由mock的根路径
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  return service(options)   //函数的返回值
}

export default request
