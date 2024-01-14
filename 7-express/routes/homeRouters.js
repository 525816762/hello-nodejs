const express = require('express')

const router = express.Router()

// router.use('中间件')

router.get('/home', (res, req) => {
  req.send('home')
})

module.exports = router
