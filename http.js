// 创建axios实例
const http = axios.create({
  baseURL: 'http://localhost:8888',
});


// 添加请求拦截器
http.interceptors.request.use(function (config) {
  
  if (localStorage.getItem('token')) {
    config.headers['authorization'] = localStorage.getItem('token');
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 封装校验是否已登录
// 返回值: 返回一个prmomise对象,状态值为对象{status:0/1,msg,token,id}  status:0表示未登录
async function isLogin() {
  // 获取本地的token和id
  let token = localStorage.getItem('token');
  let id = localStorage.getItem('uid');
  if (!token || !id) return { status: 0, msg: '用户未登录' }
  let { data: { code, info } } = await http.get('/users/info', { params: { id } })
  // 获取请求响应的数据并校验code 校验是否已登录
  if (code != 1) return { status: 0, msg: '用户未登录' };
  return {
    status: 1,
    msg: '用户已登录',
    token, id, info
  }
}

