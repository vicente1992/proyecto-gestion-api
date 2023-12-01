const multer = require('multer')
const MEDIA_PATH = '/public/storage/'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${process.cwd()}${MEDIA_PATH}`
    cb(null, pathStorage)
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.').pop()
    const filename = `file-${Date.now()}.${extension}`
    cb(null, filename)
  }
})

const uploadMiddleware = multer({ storage })

module.exports = { uploadMiddleware }