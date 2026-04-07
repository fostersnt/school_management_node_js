const multer = require("multer");
const path = require("path");

const FileProcessing = (storage_destination, fileExtensions, fileLimits = {}) => {
    //! Storage setup
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${storage_destination}/`);
        },
        filename: function (req, file, cb) {
            const uniqueName = Date.now() + "-" + file.originalname;
            cb(null, uniqueName);
        }
    });

    //! File validation
    const fileFilter = (req, file, cb) => {
        const allowedTypes = fileExtensions ?? /jpeg|jpg|png|pdf/;
        const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mime = allowedTypes.test(file.mimetype);

        if (ext && mime) {
            cb(null, true);
        } else {
            cb(new Error("Only images and PDFs are allowed"));
        }
    };

    //! Initialize upload middleware
    // { fileSize: 2 * 1024 * 1024 }
    const upload = multer({
        storage: storage,
        limits: fileLimits, // 2MB
        fileFilter: fileFilter
    });
}

module.exports.FileProcessing = FileProcessing;