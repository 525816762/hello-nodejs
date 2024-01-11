// 导入模块
const http = require('http')
const url = require('url')

const url1 = new URL('http://www.xxx.com:5555/abc?a=1&b=2')
console.log('url1', url1)

const url2 = new URL('/abc?a=1&b=2', 'http://www.xxx.com:5555')
console.log('url2', url2)

// 创建服务对象
const server = http.createServer((request, response) => {
  // 获取请求方法
  console.log('method', request.method)

  // 获取请求的url
  console.log('url', request.url)

  // 解析url
  // 第二个参数传 true 会将 query 解析为对象
  let urlParse = url.parse(request.url, true)
  console.log('urlParse', urlParse)

  // 获取请求路径
  console.log('path', urlParse.pathname)

  // 获取查询字段
  console.log('query', urlParse.query)
  // 用 URL 实例获取查询字段
  console.log('query2', new URL(request.url, 'http://127.0.0.1').searchParams.get('a'))

  // 获取http协议的版本号
  console.log('version', request.httpVersion)

  // 获取http的请求头
  console.log('header', request.headers)

  // 获取请求体
  let body = ''
  request.on('data', (chunk) => {
    body += chunk
  })
  request.on('end', () => {
    console.log('body', body)

    // 设置状态码
    response.statusCode = 201
    // 设置响应状态的描述
    response.statusMessage = 'love'
    // 解决响应内容中文乱码
    response.setHeader('content-type', 'text/html;charset=utf-8')
    // 设置同名的多个响应头
    response.setHeader('test', ['a', 'b', 'c'])
    // 设置响应体
    response.write('hello')
    response.write('hello')
    response.write('hello')
    response.end('world')
  })
})

// 监听端口，启动服务
server.listen(9000, () => {
  console.log('服务已启动')
})
