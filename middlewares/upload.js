const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

// multer обєет налаштувань
// destination це шлях тимчасової папки
// файл нейм file це файл який ми зберігли в памяті
// спрацьовує коли малтер зберіш його в пвмять але ще не зберіг на диск


const upload = multer({
    storage: multerConfig
})

module.exports = upload;