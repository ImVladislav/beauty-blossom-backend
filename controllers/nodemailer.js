const nodemailer = require("nodemailer");

// Функція для відправки електронної пошти
const email = (req, res) => {
  const { to, subject, text, image } = req.body;
  // {/* <img src="cid:${file.cid}" alt="Attachment" />; */}

  // щоб картинка була як вкладення
  // <img src="cid:$unique-image@beautyblossom.com.ua" alt="Attachment" />;

  const html = `
  <h1>${text}</h1>
  <img src="https://example.com/images/image29.png" alt="Attachment" />
  <img src="https://example.com/images/image30.png" alt="Attachment" />
  <img src="https://example.com/images/image31.png" alt="Attachment" />
  <img src="https://example.com/images/image32.png" alt="Attachment" />
<a href="https://beautyblossom.com.ua/">Перейти на сайт</a>

  <p>Відправлено з сайту Beauty Blossom</p>
  <div>
  <ul>
  <li><a href="https://tinyurl.com/mh4zwdux">Viber</a></li>
  <li><a href="https://invite.viber.com/?g2=AQBjEaVPVoQvBVJyynmJykhGNyF1TYTNKqRX1LQe7fdkVyzcb%2BAcG6%2F4HUH74WIs&lang=ru">Telegram</a></li>
  <li><a href="https://www.instagram.com/beauty_blossom_opt">Instagram</a></li>
  </ul>
  </div>
  <p>*при будь яких питаннях, звертайтесь : 0500529100 Світлана (вайбер, телеграм)</p>
  <p>З повагою, команда Beauty Blossom!</p>
  <p>${new Date().toLocaleString()}</p>

 
  
  `;

  // viber://add?number=380500529100"

  // Налаштування транспортера для відправки пошти
  const transporter = nodemailer.createTransport({
    host: "smtp.ukr.net",
    port: 2525,
    secure: true,
    auth: {
      user: "beautyblossom@ukr.net",
      pass: "mCWZuZ4ceDExLMmk",
    },
  });

  const mailOptions = {
    from: "beautyblossom@ukr.net",
    to,
    subject,
    html,
    image,
        attachments: [
      {
        filename: image.originalname, // Назва файлу
        content: image.buffer, // Дані файлу
        encoding: "base64", // Кодування
        cid: "unique-image@beautyblossom.com.ua", // Ідентифікатор контенту для вставки у тіло повідомлення
      },
    ],
  
    // attachments: [
    //   {
    //     filename: "image29.png", // назва файлу
    //     // content: file.data, // дані файлу
    //     // path: file.path, // шлях до файлу
    //     path: "./images/image29.png",
    //     encoding: "base64", // кодування
    //     cid: "unique-image@beautyblossom.com.ua", // ідентифікатор контенту для вставки у тіло повідомлення
    //     // cid: file.cid, // ідентифікатор контенту для вставки у тіло повідомлення
    //   },
    //   {
    //     filename: "image30.png", // назва файлу
    //     // content: file.data, // дані файлу
    //     // path: file.path, // шлях до файлу
    //     path: "./images/image30.png", // шлях до файлу
    //     encoding: "base64", // кодування
    //     cid: "unique-image@beautyblossom.com.ua", // ідентифікатор контенту для вставки у тіло повідомлення
    //     // cid: file.cid, // ідентифікатор контенту для вставки у тіло повідомлення
    //   },
    //   {
    //     filename: "image31.png", // назва файлу
    //     // content: file.data, // дані файлу
    //     // path: file.path, // шлях до файлу
    //     path: "./images/image31.png",
    //     encoding: "base64", // кодування
    //     cid: "unique-image@beautyblossom.com.ua", // ідентифікатор контенту для вставки у тіло повідомлення
    //     // cid: file.cid, // ідентифікатор контенту для вставки у тіло повідомлення
    //   },
    //   {
    //     filename: "image32.png", // назва файлу
    //     // content: file.data, // дані файлу
    //     // path: file.path, // шлях до файлу
    //     path: "./images/image32.png",
    //     encoding: "base64", // кодування
    //     cid: "unique-image@beautyblossom.com.ua", // ідентифікатор контенту для вставки у тіло повідомлення
    //     // cid: file.cid, // ідентифікатор контенту для вставки у тіло повідомлення
    //   },
    // ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Помилка при відправці пошти");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Пошта відправлена успішно");
    }
  });
};

module.exports = { email };

// const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport(
//     {
//         host: 'smtp.ukr.net',
//         port: 2525,
//         secure: true, // true for 465, false for other ports

//     //         tls: {
//     //     rejectUnauthorized: false // Вимкнення перевірки сертифікатів
//     // },

//     auth: {
//         user: 'beautyblossom@ukr.net',
//         pass: 'mCWZuZ4ceDExLMmk'
//     }
//     },
//     {
//         from: 'Beauty blossom <beautyblossom@ukr.net>',
//     }
// )

// const mailer = message => {
//     transporter.sendMail(message, (err, info) => {
//         if(err) return console.log(err)
//         console.log('Email sent: ', info)
//     })
// }

// module.exports = mailer
