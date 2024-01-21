/**
 * 环境配置文件
 * 一般在企业级项目里面有三个环境
 * 开发环境
 * 测试环境
 * 线上环境
 */
// 当前的环境赋值给变量env
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  //1、开发环境
  development: {
    baseApi: '/api',
    //线上mock的根路径地址
    // mockApi: 'https://www.fastmock.site/mock/d32d92a0e177cd10b103d38a2b74d3ec/api',
  },
  //2、测试环境
  test: {
    baseApi: '//test.future.com/api',
    // mockApi: 'https://www.fastmock.site/mock/d32d92a0e177cd10b103d38a2b74d3ec/api',
  },
  //3、线上环境,企业才会用，
  pro: {
    baseApi: '//future.com/api',
    // mockApi: 'https://www.fastmock.site/mock/d32d92a0e177cd10b103d38a2b74d3ec/api',
  },
}

export default {
  env,
  // mock的总开关,true则项目的所有接口调用的是mock数据
  mock: true,
  ...EnvConfig[env]//结构
}
