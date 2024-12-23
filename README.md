# 仿站电商平台项目

## 项目介绍
本项目是一个基于原生JavaScript开发的电商平台前端项目，实现了用户注册、登录、个人中心、商品列表、商品详情等功能。项目采用前后端分离的开发模式，使用axios进行前后端数据交互。

## 技术栈
- HTML5
- CSS3
- JavaScript (ES6+)
- Axios (网络请求)
- Swiper (轮播图组件)

## 项目结构
```
├── css/                    # CSS样式文件
├── js/                     # JavaScript文件
│   ├── changepwd.js       # 修改密码页面逻辑
│   ├── goods-detail.js    # 商品详情页面逻辑
│   ├── goods-list.js      # 商品列表页面逻辑
│   ├── goods.js           # 商品页面逻辑
│   ├── index.js           # 首页逻辑
│   ├── login.js           # 登录页面逻辑
│   ├── register.js        # 注册页面逻辑
│   └── user.js            # 用户中心页面逻辑
├── 相关资料/               # 第三方库和资源
│   ├── lib/               # 第三方库
│   │   ├── axios.min.js   # Axios库
│   │   └── swiper/        # Swiper轮播图库
│   └── img/               # 图片资源
├── index.html             # 首页
├── login.html             # 登录页
├── register.html          # 注册页
├── user.html              # 用户中心页
├── changepwd.html         # 修改密码页
├── goods.html             # 商品页
├── goods-list.html        # 商品列表页
└── goods-detail.html      # 商品详情页
```

## 功能特性
1. 用户模块
   - 用户注册（包含表单验证）
   - 用户登录（包含表单验证）
   - 个人中心信息展示和修改
   - 修改密码
   - 退出登录

2. 商品模块
   - 商品列表展示
   - 商品分页功能
   - 商品详情展示
   - 首页轮播图展示

## 项目运行
1. 启动本地服务器
   - 解压server.rar
   - 双击运行 win点我启动.bat

2. 访问项目
   - 使用浏览器访问 index.html

## 接口说明
- 基础URL：http://localhost:8888
- 所有需要登录的接口都需要在请求头中携带token
- 具体接口文档请参考 接口文档.md

## 注意事项
1. 用户名和密码格式要求：
   - 用户名：以字母或数字开头，长度4-12位
   - 密码：6-12位字母、数字或下划线

2. 登录状态说明：
   - 登录有效期为1小时
   - 登录状态存储在localStorage中
   - 退出登录后需要重新登录

3. 项目依赖：
   - 需要启动本地服务器才能正常运行
   - 确保网络请求的端口号与服务器端口号一致（默认8888）

## 开发者
[李林仪]

## 开源协议
MIT License 
>>>>>>> bdaa0e9 (以太坊大作业)
