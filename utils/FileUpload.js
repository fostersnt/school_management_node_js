const multer = require("multer");
const path = require("path");
const fs = require("fs");

const FileProcessing = (
    storageDestination = "public/uploads",
    fileExtensions = ["jpeg", "jpg", "png", "pdf"],
    fileSizeMB = 2
) => {

    //! Ensure folder exists
    if (!fs.existsSync(storageDestination)) {
        fs.mkdirSync(storageDestination, { recursive: true });
    }

    //! Storage setup
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, storageDestination);
        },
        filename: function (req, file, cb) {
            const cleanName = file.originalname.replace(/\s+/g, "_");
            const uniqueName = Date.now() + "_" + cleanName;
            cb(null, uniqueName);
        }
    });

    //! File validation
    const fileFilter = (req, file, cb) => {
        const allowedTypes = new RegExp(fileExtensions.join("|"));

        const ext = allowedTypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        const mime = allowedTypes.test(file.mimetype);

        if (ext && mime) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    `Only these file types are allowed: ${fileExtensions.join(", ")}`
                )
            );
        }
    };

    //! File size (convert MB → bytes)
    const limits = {
        // fileSize: fileSizeMB
        fileSize: fileSizeMB * 1024 * 1024
    };

    //! Return multer instance
    return multer({
        storage,
        limits,
        fileFilter
    });
};

module.exports = FileProcessing;