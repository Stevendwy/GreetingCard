async function agentPost(ctx) {
  let sl = ctx.request.headers["sys-language"]
  superagent
    .post(target + ctx.request.url)
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

async function agentGet(ctx) {
  let sl = ctx.request.headers["sys-language"]
  superagent
    .get(target + ctx.request.url)
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

module.exports = {
  agentGet,
  agentPost,
}