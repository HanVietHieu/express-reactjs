import multer from "multer";
import path from 'path';
import { connectionDb } from "../services/database";

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

export const uploadAvt = async (req, res) => {

  try {
    const database = await connectionDb();
    
    // Xử lý upload file bằng multer
    upload.single('file')(req, res, (err) => {

      if (err) {
        // Xử lý lỗi multer (ví dụ: file quá lớn hoặc định dạng không hợp lệ)
        return res.status(500).json({
          message: 'File upload failed!',
          error: err.message,
        });
      }

      // Kiểm tra xem file có được gửi lên không
      if (!req.file) {
        return res.status(400).json({
          message: 'No file uploaded!',
        });
      }
      const user = req?.user?.user_name
      const sql = 'UPDATE user SET avt=? where user_name=?'
      const filePath = `/uploads/${req.file.filename}`;
      database.query(
        sql,
        [filePath, user],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(401).json({
              success: false,
              message: err,
            });
          }

          res.status(200).json({
            message: 'File uploaded successfully!',
            file: req.file,
            filePath: filePath
          });
        }
      )
      // Nếu không có lỗi, gửi phản hồi thành công

    });
  } catch (error) {
    // Xử lý lỗi trong quá trình upload
    console.error(error);
    res.status(500).json({
      message: 'File upload failed!',
      error: error.message,
    });
  }
};