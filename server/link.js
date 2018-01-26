// fs 的 promise 模式
const fs = require('fs.promised')

async function index(ctx) {
  ctx.response.type = 'html'
  ctx.response.body = await fs.readFile('./index.html')
}

async function share(ctx) {
  ctx.response.type = 'html'
  ctx.response.body = await fs.readFile('./share.html')
}

async function descriptiion(ctx) {
  ctx.response.type = 'html'
  ctx.response.body = await fs.readFile('./descriptiion.html')
}

async function activity(ctx) {
  ctx.response.type = 'html'
  ctx.response.body = await fs.readFile('./activity.html')
}

module.exports = {
  index,
  share,
  descriptiion,
  activity,
}