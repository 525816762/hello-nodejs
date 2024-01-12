function a() {
  console.log('a...')
}

function b() {
  console.log('b...')
}

// module.exports暴露一个
// module.exports = a

//  module.exports多个
// module.exports = {
//   a,
//   b
// }

// exports 暴露
exports.a = a
exports.b = b

console.log(module.exports)
console.log(exports)
console.log(module.exports === exports)

// quire 导入的是 module.expots， 所以 exports = 'abc' 无法导出 'abc'
