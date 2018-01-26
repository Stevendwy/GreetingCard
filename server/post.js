const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:30001/'
let gc = null

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  // 到这里就与 mongo 的 api 一致了
  var test = db.db('test')
  gc = test.collection("GreetingCard")
})

async function login(ctx, next) {
  // ctx.redirect('/')
  ctx.body = await new Promise(() => {
    gc.find().toArray((err, result) => {
      if (err) throw err
      console.log(result)
      return result
    })
  })
}

module.exports = {
  login
}