const fs = require('fs')

// 异步写入
fs.writeFile('./node.txt', '你好 fs', (err) => {
  if (err) {
    console.log('写入失败')
    return
  }
  console.log('写入成功')
})
console.log(123)

// 同步写入
fs.writeFileSync('./node-sync.txt', '你好 fs sync')

// 追加写入
fs.appendFile('./node.txt', '，这是 append', (err) => {
  if (err) {
    console.log('追加失败')
    return
  }
  console.log('追加成功')
})

// 异步追加
fs.appendFileSync('./node-sync.txt', '\r\n这是 appendSync')

// writeFile实现追加写入
fs.writeFile('./node.txt', '\r\nwriteFile 实现追加写入', { flag: 'a' }, (err) => {
  if (err) {
    console.log('writeFile写入失败')
    return
  }
  console.log('writeFile追加写入成功')
})

// 流式写入
// const ws = fs.createWriteStream('./流式写入.txt')
// ws.write('刚翻过了几座山\r\n')
// ws.write('又越过了几条河\r\n')
// ws.write('艰难坎坷\r\n')
// ws.write('怎么他就那么多\r\n')
// ws.end()

// 异步读取
fs.readFile('./node.txt', (err, data) => {
  if (err) {
    console.log('读取失败')
    return
  }
  console.log('异步读取', data.toString())
})
console.log(456)

// 同步读取
const data = fs.readFileSync('./node-sync.txt')
console.log('同步读取', data.toString())

// 流式读取
const rs = fs.createReadStream('./流式写入.txt')
// 绑定data事件
rs.on('data', (chunk) => {
  console.log('chunk', chunk) // 一次最大读取 65536 字节 => 64KB
})
// end 可选事件
rs.on('end', () => {
  console.log('读取完成')
})

// 文件复制
// 方式1 readFile
const copyData = fs.readFileSync('./流式写入.txt')
fs.writeFileSync('./流式写入-2.txt', copyData)
// 方式2 流式操作 内存占用少
const copyRs = fs.createReadStream('./流式写入.txt')
const copyWS = fs.createWriteStream('./流式写入-3.txt')
copyRs.on('data', (chunk) => {
  copyWS.write(chunk)
})
// 方式3 管理pipe 不常用
// copyRs.pipe(copyWS)
