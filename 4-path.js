const path = require('path')

// 拼接规范的绝对路径 常用
console.log(path.resolve(__dirname, './index.html'))

// 获取操作系统的路径分隔符
console.log(path.sep)

// 解析路径返回对象
const str = 'F:\\code\\hello-node\\4-path.js'
console.log(path.parse(str))

// 获取路径的文件名称
console.log(path.basename(str))

// 获取路径的目录名
console.log(path.dirname(str))

// 获取路径的扩展名
console.log(path.extname(str))
