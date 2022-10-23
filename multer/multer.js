const multer = require('multer');
const storage = multer.memoryStorage();
let upload = multer({storage: storage});

module.exports = upload;