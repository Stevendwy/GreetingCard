const Koa = require('koa')
const app = new Koa()

// koa 静态文件处理包
const static = require('koa-static')
// koa 路由包
const route = require('koa-route')
// koa body 模块
const body = require('koa-body')
// koa 合并中间件包
// const compose = require('koa-compose')
const superagent = require('superagent')

const target = 'https://test.007vin.com'
let cookie = ''

superagent
  .post(target + '/login?username=18868432772&password=aa123456')
  .end((err, res) => {
    // console.log(res.body)
    if (res.body.code === 1) console.log('登录成功')
    else console.log(res.body)
    // 获取 Cookie, beta 处理有问题, 需要如下处理才能登陆
    cookie = res.header['set-cookie']
    if (!(cookie instanceof String)) cookie = cookie.toString()
    cookie = cookie.replace(/(Path=\/),/g, '$1;') // 莫名的一个逗号, 需要处理成 ';'
  })

const { login, loginResult } = require('./agent/post')
const { index, share, descriptiion, activity } = require('./agent/link')

// koa-body 使用
app.use(body())

// 静态文件处理
app.use(static('./'))

// 路由
app.use(route.get('/', index))
app.use(route.get('/share', share))
app.use(route.get('/descriptiion', descriptiion))
app.use(route.get('/activity', activity))
app.use(route.get('/*', agentGet))

// 中间件，接口处理
app.use(route.post('/*', agentPost))

async function agentGet(ctx) {
  let body = await new Promise((resolve, reject) => {
    return superagent
      .get(target + ctx.request.url)
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('Cookie', cookie)
      .send(ctx.request.query)
      .end((err, sRes) => {
        if (sRes.body.code !== 1) console.log(sRes.body)
        resolve(sRes.body)
      })
  })
  ctx.response.body = body
}

async function agentPost(ctx) {
  let body = await new Promise((resolve, reject) => {
    return superagent
      .post(target + ctx.request.url)
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('Cookie', cookie)
      .send(ctx.request.body)
      .end((err, sRes) => {
        if (sRes.body.code !== 1) console.log(sRes.body)
        resolve(sRes.body)
      })
  })
  ctx.response.body = body
}

app.listen(8888, (err) => {
  if (err) return
  console.log('run in http://localhost:8888')
})