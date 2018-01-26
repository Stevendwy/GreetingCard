const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:30001/'
let gc = null

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  // 到这里就与 mongo 的 api 一致了
  const test = db.db('test')
  gc = test.collection("GreetingCard")
})

async function login(ctx, next) {
  const result = await next()
  
  if(result.code === 1) ctx.response.redirect('/activity.html?username=' + ctx.request.body.username)
  else ctx.response.redirect('/')
}

async function loginResult(ctx, next) {
  return new Promise((res, rej) => {
    gc.find({username: ctx.request.body.username}).toArray((err, result) => {
      if (err) throw err
      else if(result.length > 0) res(result)
      else rej()
    })
  })
  .then(result => {
    return {
      code: 1
    }
  })
  .catch(reject => {
    return 'empty'
  })
}

module.exports = {
  login,
  loginResult,
}