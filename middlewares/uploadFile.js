const multer = require("multer");
const path = require("path");

// define storage settings for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // set the destination folder for file upload
  },
  // set the filename to be unique and include the original file extension
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Set the filename to be unique and include the original file extension
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
// Define file filter to accept only PDF and Word documents for the resume
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    if (!file.originalname.match(/\.(pdf|docx)$/)) {
      return cb(new Error("Please upload a PDF or Word document"));
    }
  } else if (file.fieldname === "photo") {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      return cb(new Error("Please upload a JPEG image"));
    }
  }
  cb(null, true);
};

// Set up multer with defined storage and filters
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
