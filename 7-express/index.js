const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const homeRouter = require('./routes/homeRouters')
const cookieParser = require('cookie-parser')

const app = express()

// 模块化路由
app.use(homeRouter)

// 防盗链中间件
app.use((res, rps, next) => {
  const referer = res.get('referer')
  if (referer) {
    if (new URL(referer).hostname !== '127.0.0.1') {
      rps.status(404).send('404 Not Found')
      return
    }
  }
  next()
})

// 声明全局中间件函数
function recordMiddleware(req, res, next) {
  let { url, ip } = req
  fs.appendFileSync(__dirname + '/access.log', `${url} ${ip}\r\n`)
  next()
}
app.use(recordMiddleware)

// 静态资源中间件
app.use(express.static(__dirname + '/public'))

// 声明路由中间件函数
function checkCodeMiddleware(req, res, next) {
  if (req.query.code === '521') {
    next()
  } else {
    res.send('暗号错误')
  }
}

// req 操作
app.get('/requset', checkCodeMiddleware, (req, res) => {
  // 原生操作
  console.log(`output->req.method`, req.method)
  console.log(`output->req.url`, req.url)
  console.log(`output->req.httpVersion`, req.httpVersion)
  console.log(`output->req.headers`, req.headers)

  // express 操作
  console.log(`output->req.path`, req.path)
  console.log(`output->req.query`, req.query)
  console.log(`output->req.ip`, req.ip)
  console.log(`output->req.get('host')`, req.get('host'))

  res.end('requset')
})

// 获取路由参数
app.get('/:id.html', (req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  res.end('路由参数：' + req.params.id)
})

// res 操作
app.get('/reponse', (req, res) => {
  // 原生响应
  //   res.statusCode = 404
  //   res.statusMessage = 'null'
  //   res.setHeader('xxx', 'yyy')
  //   res.write('hello ')
  //   res.end('reponse')

  // express 响应
  //   res.status(500)
  //   res.set('aaa', 'bbb')
  //   res.send('你好 response')

  // express 响应 链式调用
  res.status(500).set('aaa', 'bbb').send('链式调用')
})

// 重定向
app.get('/redirect', (req, res) => {
  res.redirect('http://atguigu.com')
})

// 下载
app.get('/download', (req, res) => {
  res.download(__dirname + '/index.js')
})

// json
app.get('/json', (req, res) => {
  res.json({
    first: 'hello',
    last: 'world'
  })
})

// 响应文件内容
app.get('/file', (req, res) => {
  res.sendFile(__dirname + '/index.js')
})

// 解析JSON格式 请求头的中间件
const jsonParser = bodyParser.json()
// 解析 queryString 格式请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// 获取请求体
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html')
})
app.post('/login', urlencodedParser, (req, res) => {
  console.log(req.body)
  res.send('登陆成功')
})

// 设置 cookie
app.get('/setCookie', (req, res) => {
  res.cookie('key', 'value', { maxAge: 1000 * 60 }) // 有效期 1 分钟
  res.send('设置成功')
})

// 删除 cookie
app.get('/delCookie', (req, res) => {
  res.clearCookie('key')
  res.send('删除成功')
})

// 获取cookie
app.use(cookieParser())
app.get('/getCookie', (req, res) => {
  console.log(`output->req.cookies`, req.cookies)
  res.send('获取成功')
})

app.all('*', (req, res) => {
  res.end('404 Not Found')
})

app.listen(9000, () => {
  console.log('服务已启动')
})
