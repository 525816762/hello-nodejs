let buf = Buffer.alloc(10)
console.log('buf', buf)

let buf2 = Buffer.allocUnsafe(10)
console.log('buf2', buf2)

let buf3 = Buffer.from('hello')
console.log('buf3', buf3[0]) 
console.log('buf3', buf3[0].toString(2))  // 进制转换
buf3[0] = 95
console.log('buf3', buf3.toString())

let buf4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
console.log('buf4', buf4.toString())    // 转为对应的字符串
  
// 溢出
let buf5 = Buffer.from('hello')
buf5[0] = 361 // 舍弃高位的数字，高于8位的都丢弃 0001 0110 1001 => 0110 1001 
console.log('buf5', buf5[0].toString(2))

//中文
let buf6 = Buffer.from('你好')
console.log('buf6', buf6) // utf-8 一个中文占3个字节

