import multer from "multer";
import cloudinaryFn from "../config/cloud.js";


import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let filePath;
    process.env.NODE_ENV === "production" ? filePath = "/tmp" : filePath = path.join(__dirname, "../uploads")
    // filePath = path.join(__dirname, "../uploads")
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1000000, // 2MB
  },
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

const uploadPictureCloud = async (file)=>{
  try{
    const cloudinary = cloudinaryFn()
    const upload = await cloudinary.v2.uploader.upload(file.path);
    return upload.secure_url
  }
  catch(error){
    console.log
  }
  
}

export { uploadPicture, uploadPictureCloud };
