const express = require("express");
const router = express.Router();
const path = require("path")
const mongoose = require("mongoose");

const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const multer = require("multer");
const crypto = require("crypto");

const mongoURI = 'mongodb://localhost:27017/modsv2'
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo); // resolve the promise with the fileInfo
      });
    });
  }
});
// passing the storage engine to multer under upload
const upload = multer({ storage });

// Handle uploads
// @route POST /upload
router.post("/", upload.single('file'), (req,res) => { 
  res.json({ file: req.file })
  // res.redirect('/')
}); // form action "/upload" name="file"

// @route GET /files -> display all files in json
router.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files)=> {
    // Check if files
    if (!files || files.length === 0){
      return res.status(404).json({err: 'No files exist'})
    } 
    // files exist
    return res.json(files);

  })
})

// @route GET /files/:filename -> display one file in json
router.get("/files/:filename", (req, res)=>{
  gfs.files.findOne({filename:req.params.filename}, (err,file)=> {
     // Check if file
     if (!file || file.length === 0){
        return res.status(404).json({err: 'No file exist'})
      } 
      // file exists
      return res.json(file);
  });
});

module.exports = router;