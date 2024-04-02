const express = require("express");
const moment = require("moment");
const logger = require("morgan");
const fs = require("fs/promises");
const cors = require("cors");
require("dotenv").config();
// const uploadRouter = require("./routes/api/upload");
const authRouter = require("./routes/api/auth");
const goodsRouter = require("./routes/api/goods");
const ordersRouter = require("./routes/api/orders");
const inProgressWood = require("./routes/api/inProgressWood");
const basket = require("./routes/api/basket");
const feedbackRouter = require("./routes/api/feedback");
const emailRouter = require("./routes/api/email");
// const uploadMiddleware = require("./middlewares/upload");
const path = require("path");

// const bodyParser = require("body-parser");
const app = express(); // веб сервер

// модифікована вставка ======================================================

// const express = require("express");
// const multer = require("multer");
// const nodemailer = require("nodemailer");
// const path = require("path");

// const app = express();
// const PORT = 3003;

app.use(express.static(path.join(__dirname, "public")));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage }).array("file", 100);

// app.post("/sendemail", upload, async (req, res) => {
//   try {
//     const paths = req.files.map((file, index) => ({
//       filename: file.filename,
//       path: file.path,
//       cid: `image-${Date.now()}-${index}@nodemailer.com`,
//     }));

//     const transporter = nodemailer.createTransport({
//       host: "smtp.ukr.net",
//       port: 2525,
//       secure: true,
//       auth: {
//         user: "beautyblossom@ukr.net",
//         pass: "mCWZuZ4ceDExLMmk",
//       },
//     });

//     const imagesHtml = paths
//       .map((image) => `<img src='cid:${image.cid}'>`)
//       .join("<br>");

//     const mailOptions = {
//       from: "beautyblossom@ukr.net",
//       to: "nafanya102@gmail.com",
//       subject: "This message contains multiple attachments",
//       text: "This is the body of the email with attachments.",
//       html: `
//         <p>Hello from Gmail API</p>
//         <br>
//         <p>Here are the images you uploaded:</p>
//         <br>
//         ${imagesHtml}
//       `,
//       attachments: paths,
//     };

//     const result = await transporter.sendMail(mailOptions);
//     console.log("Email is sent:", result);
//     res.send("Email is sent please check the inbox");
//   } catch (error) {
//     console.log("An error occurred:", error);
//     res.send("Error is there in sending mail");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`App is listening on port ${PORT}`);
// });

// ============================================================================

// вставка ======================================================================

// const nodemailer = require("nodemailer");
// // const express = require("express");
// const multer = require("multer");
// // const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Додавання розширення
//   },
// });

// const upload = multer({ storage: storage }).array("file", 100);

// const PORT = 3003;
// // const app = express();

// app.use(express.static(path.join(__dirname, "public/uploads")));

// app.get("/", (req, res) => {
//   // eslint-disable-next-line node/no-path-concat
//   res.sendFile(__dirname + "/index.html");
// });

// // eslint-disable-next-line prefer-const
// let paths = [];

// app.post("/sendemail", (req, res) => {
//   upload(req, res, (error) => {
//     if (error) {
//       console.log("Error in uploading files");
//       // return;
//     } else {
//       req.files.forEach((file) => {
//         paths.push({
//           filename: Date.now() + "file" + path.extname(file.originalname),
//           path: file.path,
//         });
//       });
//       console.log(paths);
//       sendEmail(paths)
//         .then((result) => {
//           console.log("Email is sent " + result);
//           res.send("Email is sent please check the inbox");
//         })
//         .catch((error) => {
//           console.log("An error occurred:", error);
//           res.send("Error is there in sending mail");
//         });
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log("App is listening on port 3003");
// });

// async function sendEmail(paths) {
//   // try {
//   //   const transport = nodemailer.createTransport({
//   //     service: "gmail",
//   //     auth: {
//   //       type: "OAuth2",
//   //       user: "sharmagautam1997dob@gmail.com",
//   //       clientId: CLIENT_ID,
//   //       clientSecret: CLIENT_SECRET,
//   //       accessToken:
//   //         "ya29.ABARrdaM8x89ygLT5zGZkSj12xsqT6x1LuEUh3WdYDkogxi0FW2FDE3DkrZACV34yt6KgKL",
//   //     },
//   //   });
//   try {
//     const transport = nodemailer.createTransport({
//       host: "smtp.ukr.net",
//       port: 2525,
//       secure: true,
//       auth: {
//         user: "beautyblossom@ukr.net",
//         pass: "mCWZuZ4ceDExLMmk",
//       },
//     });

//     // const mailOptions = {
//     //   from: "sharmagautam1997dob@gmail.com",
//     //   to: "geekygautam1997@gmail.com",
//     //   subject: "This message contains multiple attachments",
//     //   text: "this is body of attachment message",
//     //   html: "<p>Hello from Gmail API</p><br><p> this is a image</p><br><img src='https:/'>",
//     //   attachments: paths,
//     // };

//     const mailOptions = {
//       from: "beautyblossom@ukr.net",
//       to: "geekygautam1997@gmail.com",
//       subject: "This message contains multiple attachments",
//       text: "this is body of attachment message",
//       html: "<p>Hello from Gmail API</p><br><p> this is a image</p><br><img src='https:/'>",
//       attachments: paths,
//     };

//     const result = await transport.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }
// }

// =====================================================================================================

// шукає запит шлях поки не знайде 1 підходяще

// const multer = require("multer");

// // Функція для відправки електронної пошти

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// const { email } = require("./controllers/nodemailer");
app.use(logger(formatsLogger));
// логер це спеціальна мідлвара щоб вивести в консоль інфу про запит
// для дебагінгу
app.use(cors());

// для обходу корсу щоб працював фронт і бек//

// app.use((req, res, next) => {
//   console.log(middleware);
// })
// якщо не задати 1 арг шлях то експрес буде виконувати цю функцію
// і завертуватиме свою роботу
// якщо викликати next то експерс продовжує свою роботу

// метод use якщо немає маршруту, а йде одразу функція він підходть
// до будь якого маршруту експрес виконає цю функцію.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
// якщо прийде запит за файли бери його з папки паблік

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRouter);
app.use("/api/goods", goodsRouter);
app.use("/api/orders/", ordersRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/inProgressWood", inProgressWood);
app.use("/api/basket", basket);
// app.use(bodyParser.json());
app.use("/api/email", emailRouter);
// app.use("/api/upload", uploadMiddleware);

// app.use("/api/upload", uploadRouter);
// в юзі першим вказуєш шлях тоді для мідл вара цей запис буде стосуватися
// маршруту тому в файлі вуд цей шлях є дефолтним
app.use(async (req, res, next) => {
  const { method, url } = req; // метод та url беремо з реквесту
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  const logData = `\n${method} ${url} ${date}`;
  //  \n щоб писало з нової строки
  await fs.appendFile("./public/server.log", logData);

  next(); // щоб експерес продовжував далі працювати ставимо некст.
});

// app.get('/', async(request, responce) => {
//   responce.send('<h1> home page </h1>')
// })

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

// const { program } = require('commander');

// const woodModule = require('./WoodStorage');
// // const desks = require("./WoodStorage/desks");
// // const production = require("./WoodStorage/production");

// const invokeActionWood = async ({ action, diametr, name, amount, id }) => {
//     switch (action) {
//         case 'read':
//             const allWood = await woodModule.getAll();
//             return console.log(allWood);
//         case 'getById':
//             const woodItem = await woodModule.getById(id);
//             return console.log(woodItem);
//         case 'add':
//             const newWood = await woodModule.add({ diametr, name, amount});
//             return console.log(newWood);
//         case 'updateById':
//             const udatedWood = await woodModule.updateById(id, { diametr, name, amount })
//             return console.log(udatedWood)
//         case 'deleteById':
//             const deleteWood = await woodModule.deleteById(id)
//             return console.log(deleteWood);
//         default:
//             return console.log('Unknown action');
//     }
// }

// const actionIndex = process.argv.indexOf('--action');
// if (actionIndex !== -1) {
//     const action = process.argv[actionIndex + 1];
//     invokeActionWood({action})
// }

// program
//     .option('-a, --action, <type>')
//     .option('--diametr, <type>')
//     .option('--name, <type>')
//     .option('--amount, <type>')
//     .option('--id, <type>');
// program.parse();

// const options = program.opts();
// invokeActionWood(options)

// // console.log(process.argv);
// //node app --action read
// // глобальна змінна все що прописано в командній строці
// //    'C:\\Program Files\\nodejs\\node.exe',
// //   'C:\\Users\\Vlad\\Desktop\\react-48\\node\\app',
// //   '--action',
// //   'read'

// // invokeActionWood({ action: 'read' });
// // invokeActionWood({ action: 'getById', id:'4'})
// //  invokeActionWood({ action: 'add', diametr: 50, name: 'береза', amount: 30, id:'2'})
// //  invokeActionWood({ action: 'updateById', diametr: 70, id:'50', name: 'turbo береза', amount: 34, id:'80'})
// //  invokeActionWood({ action: 'deleteById', id:'80'})
