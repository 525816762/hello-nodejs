const jwt = require('jsonwebtoken')

// 生成token
const token = jwt.sign(
  {
    username: 'tom'
  },
  'hellojwt',
  {
    expiresIn: 60 // 秒
  }
)

console.log(`output->token`, token)

// 校验token
jwt.verify(token, 'hellojwt', (err, data) => {
  if (err) {
    console.log('校验失败')
    return
  }

  console.log(`output->data`, data)
})
