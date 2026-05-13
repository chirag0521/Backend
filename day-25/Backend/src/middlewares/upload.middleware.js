const multer = require("multer")

/** 
*    @oneway =  of using multer
    const upload = multer({ storage: multer.memoryStorage() })
 */

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // 5MB of filesize allowed 
    }
})


module.exports = upload


