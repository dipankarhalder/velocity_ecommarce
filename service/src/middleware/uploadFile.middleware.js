/** Node modules */
import path from "path";
import multer from "multer";

/** Define upload directory */
const UPLOAD_DIR = path.resolve("src/uploads");

/** Configure storage */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const name = path
      .parse(file.originalname)
      .name.replace(/\s+/g, "-");
    const ext = path.extname(file.originalname);
    const uniqueName = `${Math.random().toString(36).slice(2)}-${name}${ext}`;
    cb(null, uniqueName);
  },
});

/** File filter for image types only */
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only .png, .jpg, and .jpeg formats are allowed!",
      ),
    );
  }
};

/** Configure upload middleware */
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } /** Max 5 MB */,
  fileFilter,
});
