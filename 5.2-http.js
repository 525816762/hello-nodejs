const http = require('http')
const fs = require('fs')
const path = require('path')
const mimes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  json: 'application/json'
}

const server = http.createServer((request, response) => {
  //   response.setHeader('content-type', 'text/html;charset=utf-8')
  const { method, url } = request
  console.log(method)
  const { pathname } = new URL(url, 'http:127.0.0.1')
  console.log(pathname)

  // 根据请求返回不同的内容
  //   if (method === 'GET') {
  //     // if (url.includes('login')) {
  //     //   response.end('登录')
  //     //   return
  //     // } else if (url.includes('reg')) {
  //     //   response.end('注册')
  //     //   return
  //     // }
  //     if (pathname === '/login') {
  //       response.end('登录')
  //       return
  //     } else if (pathname === '/reg') {
  //       response.end('注册')
  //       return
  //     }
  //   }
  //   response.end('NOT FOUND')

  // 返回html
  // 解决html 引用 css js
  // if (pathname === '/') {
  //   response.end(fs.readFileSync(__dirname + '/5.3-table.html'))
  // } else if (pathname === '/5.3-table.css') {
  //   // 返回css 不能加response.setHeader('content-type', 'text/html;charset=utf-8') 否则会失效
  //   response.end(fs.readFileSync(__dirname + '/5.3-table.css'))
  // } else if (pathname === '/5.3-table.js') {
  //   response.end(fs.readFileSync(__dirname + '/5.3-table.js'))
  // } else {
  //   response.end('<h1>404 Not Found</h1>')
  // }

  // 静态资源服务
  const filePath = __dirname + pathname
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.statusCode = 500
      response.end('<h1>404 Not Found</h1>')
      return
    }
    // 设置 MIME 媒体类型
    const ext = path.extname(filePath).slice(1)
    console.log('ext', ext)
    // 对于未知的资源类型，可以选择 application/octet-stream，浏览器会对响应体内容独立存储，也就是常见的下载效果
    // 加 ;charset=utf-8 解决中文乱码问题
    let type = mimes[ext] ? mimes[ext] + ';charset=utf-8' : 'application/octet-stream'
    response.setHeader('content-type', type)
    response.end(data)
  })
})

server.listen(9000, () => {
  console.log('服务启动')
})
