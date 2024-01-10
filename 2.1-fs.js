const fs = require('fs')

// // 修改文件名称
// fs.rename('./node.txt', './node-new.txt', (err) => {
//   if (err) {
//     console.log('操作失败')
//     return
//   }
//   console.log('操作成功')
// })

// // 移动文件
// fs.rename('./node-new.txt', './.vscode/node-new.txt', (err) => {
//   if (err) {
//     console.log('操作失败')
//     return
//   }
//   console.log('操作成功')
// })

// 删除文件
// unlink unlinSync
// fs.unlink('./流式写入-3.txt', (err) => {
//   if (err) {
//     console.log('删除失败')
//     return
//   }
//   console.log('删除成功')
// })
// rm rmSync
// fs.rm('./流式写入-2.txt', (err) => {
//   if (err) {
//     console.log('删除失败')
//     return
//   }
//   console.log('删除成功')
// })

// 文件夹操作
// 创建文件夹
// fs.mkdir('./html', (err) => {
//   if (err) {
//     console.log('创建失败')
//     return
//   }
//   console.log('创建成功')
// })
// 递归创建
// fs.mkdir('./a/b', { recursive: true }, (err) => {
//   if (err) {
//     console.log('创建失败')
//     return
//   }
//   console.log('创建成功')
// })
// 读取文件夹
fs.readdir('./', (err, data) => {
  if (err) {
    console.log('读取失败')
    return
  }
  console.log('data', data)
})
// 删除文件夹
// fs.rmdir('./html', (err) => {
//   if (err) {
//     console.log('删除失败')
//     return
//   }
//   console.log('删除成功')
// })
// 递归删除 不推荐使用
// fs.rmdir('./a', { recursive: true }, (err) => {
//   if (err) {
//     console.log('删除失败')
//     return
//   }
//   console.log('删除成功')
// })
// rm 建议使用
// fs.rm('./a', { recursive: true }, (err) => {
//   if (err) {
//     console.log('删除失败')
//     return
//   }
//   console.log('删除成功')
// })

// 查看资源信息
fs.stat('./node-new.txt', (err, data) => {
  if (err) {
    console.log('操作失败')
    return
  }
  console.log('data', data)
  // isFile
  console.log('isFile', data.isFile())
  // isDirectory
  console.log('isFile', data.isDirectory())
})
