var express = require('express')
var router = express.Router()
const { formidable } = require('formidable')

/* GET upload listing. */
router.get('/', function (req, res, next) {
  res.render('upload')
})

router.post('/', (req, res, next) => {
  const form = formidable({
    multiples: true,
    // 设置文件上传路径
    uploadDir: __dirname + '/../public/images',
    // 保持文件后缀
    keepExtensions: true
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }
    console.log(`output->fields`, fields)
    console.log(`output->files`, files)

    const uploadUrl = '/images/' + files.file[0].newFilename

    res.send(uploadUrl)
  })
})

module.exports = router
