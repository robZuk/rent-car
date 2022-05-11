import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

var app = express();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
    //null - no errores, uploads - filename, destination is used to determine within which folder the uploaded files should be stored.
  },
  filename(req, file, cb) {
    // request, filename , callback, filename is used to determine what the file should be named inside the folder.
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      //null -no error, extname - path method - get name of extensions(jpg, png, ...)
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //return true/false
  const mimetype = filetypes.test(file.mimetype); //return true/false

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

router.post("/images", upload.array("images", 12), (req, res, next) => {
  const images = [];

  for (var i = 0; i < req.files.length; i++) {
    images.push(`/${req.files[i].path}`);
  }
  res.send(images);
});

export default router;
