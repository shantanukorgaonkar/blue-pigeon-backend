import path from "path";
import multer from "multer"
import { sendError } from "src/utils/utils";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const videoMimeTypes = ['video/mp4', 'video/mov', 'video/wmv', 'video/gif', 'video/quicktime'];
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            return cb(null, true);
        }
        else if (videoMimeTypes.includes(file.mimetype)) {
            return cb(null, true);
        }
        else {
            // Reject file
            cb(new Error("Incorrect filetype."));
        }
    },
})

export default upload