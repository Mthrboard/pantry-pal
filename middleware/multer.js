const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname.toLowerCase())
    const allowed_extensions = process.env.MULTER_ALLOWED_EXTENSIONS.split(',').map(e => e.trim())
    if (allowed_extensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("File type is not supported"), false);
    }
  },
})