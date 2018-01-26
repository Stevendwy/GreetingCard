const Koa = require('koa')
const app = new Koa()

// koa 静态文件处理包
const static = require('koa-static')
// koa 路由包
const route = require('koa-route')
// koa body 模块
const body = require('koa-body')
// koa 合并中间件包
const compose = require('koa-compose')

const { login } = require('./server/post')
const { index, share, descriptiion, activity } = require('./server/link')

// 路由
app.use(route.get('/', index))
app.use(route.get('/share', share))
app.use(route.get('/descriptiion', descriptiion))
app.use(route.get('/activity', activity))

// 中间件，接口处理
// const middlewares = compose([login])
app.use(route.post('/login', login))

// 重定向
// app.use(route.post('/login', redirect))

// 静态文件处理
app.use(static('./'))

app.listen(3000)