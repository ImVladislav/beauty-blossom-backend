const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "public/uploads");
    cb(null, "/var/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array("file", 100);

module.exports = { upload }; // Експорт об'єкта з middleware upload
// multer обєет налаштувань
// destination це шлях тимчасової папки
// файл нейм file це файл який ми зберігли в памяті
// спрацьовує коли малтер зберіш його в пвмять але ще не зберіг на диск

// const multer = require("multer");
// const path = require("path");

// const tempDir = path.join(__dirname, "../", "temp");

// const multerConfig = multer.diskStorage({
//     destination: tempDir,
//     filename: (req, file, cb) =>{
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({
//     storage: multerConfig
// })

// module.exports = upload;
