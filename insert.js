const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:30001/'

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  // 到这里就与 mongo 的 api 一致了
  const gc = db.db('test').collection("GreetingCard")
  find(gc).then(res => {
    console.log('已有数据: ', res)
  })
  .catch(gc => {
    console.log('暂无数据')
    insert(gc)
  })
})

function find(gc) {
  return new Promise((res, rej) => {
    gc.find().toArray((err, result) => {
      if(err) return
      else if(result.length > 0) res(result)
      else rej(gc)
    })
  })
}

function insert(gc) {
  gc.insert(testData, (err, result) => {
    if(err) return

    console.log(result)
  })
}

const testData = {
  code: 1,
  msg: '成功',
  username: '18888888888',
  password: 'aa123456',
  data: [
    {
      year: 2017,
      month: 5,
      day: 1
    },
    {
      vin: 500,
      car: 400,
      part: 300,
      index: 1000
    },
    {
      all: 5000,
      part: 4000
    },
    {
      brand: '奔驰',
      data: [
        { value: 10, name: 'MINI' },
        { value: 5, name: '宝马' },
        { value: 15, name: '奥迪' },
        { value: 25, name: '大众' },
        { value: 20, name: '玛莎拉蒂' },
        { value: 35, name: '法拉利' },
        { value: 30, name: '奔驰' },
        { value: 40, name: '沃尔沃' }
      ]
    }
  ],
}