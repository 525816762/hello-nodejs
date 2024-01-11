const http = require('http')
const fs = require('fs')

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
  if (pathname === '/') {
    response.end(fs.readFileSync(__dirname + '/5.3-table.html'))
  } else if (pathname === '/5.3-table.css') {
    // 返回css 不能加response.setHeader('content-type', 'text/html;charset=utf-8') 否则会失效
    response.end(fs.readFileSync(__dirname + '/5.3-table.css'))
  } else if (pathname === '/5.3-table.js') {
    response.end(fs.readFileSync(__dirname + '/5.3-table.js'))
  } else {
    response.end('<h1>404 Not Found</h1>')
  }
})

server.listen(9000, () => {
  console.log('服务启动')
})
