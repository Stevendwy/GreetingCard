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
  let requestBody = ctx.request.body
  let responseBody = ctx.response.body
  // console.log(requestBody)
  responseBody = await new Promise((res, rej) => {
    gc.find({username: requestBody.username}).toArray((err, result) => {
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

  if(responseBody.code === 1) ctx.response.redirect('/activity.html?username=' + requestBody.username)
  else ctx.response.redirect('/')
}

function loginResult() {
  console.log('loginResult')
}

module.exports = {
  login
}