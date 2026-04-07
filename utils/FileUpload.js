const multer = require("multer");
const path = require("path");

// const FileProcessing = (storageDestination, fileExtensions, fileLimits = {}) => {
    //! Storage setup
    const storageDestination = 'uploads';
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${storageDestination}/`);
        },
        filename: function (req, file, cb) {
            const cleanName = file.originalname.replace(/\s+/g, "_");
            const uniqueName = Date.now() + "-" + cleanName;
            cb(null, uniqueName);
        }
    });

    //! File validation
    const fileFilter = (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mime = allowedTypes.test(file.mimetype);

        if (ext && mime) {
            cb(null, true);
        } else {
            cb(new Error("Only images and PDFs are allowed"));
        }
    };

    //! Initialize upload middleware
    const fileLimits = { fileSize: 2 * 1024 * 1024 }
    const uploadFunc = multer({
        storage: storage,
        limits: fileLimits, // 2MB
        fileFilter: fileFilter
    });
// }

module.exports.uploadFunc = uploadFunc;