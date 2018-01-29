const Koa = require('koa')
const app = new Koa()
const body = require('koa-body')
const route = require('koa-route')
const superagent = require('superagent')

const target = 'https://test.007vin.com'

let cookie = ''

superagent
  .post(target + '/login?username=18337125987&password=aa123456')
  .end((err, res) => {
    // console.log(res.body)
    if(res.body.code === 1) console.log('登录成功')
    else console.log(res.body)
    // 获取 Cookie, beta 处理有问题, 需要如下处理才能登陆
    cookie = res.header['set-cookie']
    if(!(cookie instanceof String)) cookie = cookie.toString()
    cookie = cookie.replace(/(Path=\/),/g, '$1;') // 莫名的一个逗号, 需要处理成 ';'
  })

app.use(body())
app.use(route.get('/*', ctx => agentGet(ctx)))
app.use(route.post('/*', ctx => agentPost(ctx)))

function agentPost(ctx) {
  let sl = ctx.headers["sys-language"]
  superagent
    .post(target + ctx.url)
    .set('Content-Type', 'application/json;charset=UTF-8')    
    .set('Cookie', cookie)
    .set('sys-language', sl)
    .send(ctx.request.body)
    .end((err, sRes) => {
      if(sRes.body.code !== 1) console.log(sRes.body)
      // console.log(sRes.body)
      res.set('Content-Type', 'application/json');      
      res.send(JSON.stringify(Object.assign(sRes.body, { isLocal: true }))) // 测试标记
      // res.end(JSON.stringify(sRes.body))
    })
}

function agentGet(ctx) {
  let sl = ctx.headers["sys-language"]
  superagent
    .get(target + ctx.url)
    .set('Content-Type', 'application/json;charset=UTF-8')    
    .set('Cookie', cookie)
    .set('sys-language', sl)
    .send(ctx.request.query)
    .end((err, sRes) => {
      // console.log(sRes.body)
      res.set('Content-Type', 'application/json');      
      res.send(JSON.stringify(Object.assign(sRes.body, { isLocal: true })))
    })
}

app.listen(8888, '0.0.0.0', (err) => {
  if(err) console.log(err)
  else console.log('run on 0.0.0.0:8888')
})