// const nodemailer = require("nodemailer");
// const { ctrlWrapper } = require("../helpers");

// async function email(req, res, paths) {
//   const { to, subject, text } = req.body;
//   const html = `
//     <h1>${text}</h1>
//     <img src="https://freemediatools.com/img/profile.jpg" alt="Attachment" />

//     <a href="https://beautyblossom.com.ua/">Перейти на сайт</a>

//     <p>Відправлено з сайту Beauty Blossom</p>
//     <div>
//     <ul>
//     <li><a href="https://tinyurl.com/mh4zwdux">Viber</a></li>
//     <li><a href="https://invite.viber.com/?g2=AQBjEaVPVoQvBVJyynmJykhGNyF1TYTNKqRX1LQe7fdkVyzcb%2BAcG6%2F4HUH74WIs&lang=ru">Telegram</a></li>
//     <li><a href="https://www.instagram.com/beauty_blossom_opt">Instagram</a></li>
//     </ul>
//     </div>
//     <p>*при будь яких питаннях, звертайтесь : 0500529100 Світлана (вайбер, телеграм)</p>
//     <p>З повагою, команда Beauty Blossom!</p>
//     <p>${new Date().toLocaleString()}</p>
//   `;

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

//     const mailOptions = {
//       from: "beautyblossom@ukr.net",
//       to,
//       subject,
//       html,
//       attachments: paths,
//     };

//     const result = await transport.sendMail(mailOptions);
//     return result;
//   } catch (error) {
//     return error;
//   }
// }

// module.exports = {
//   email: ctrlWrapper(email),
// };
// const { to, subject, text } = req.body;'

const nodemailer = require("nodemailer");
const { ctrlWrapper } = require("../helpers");

const fs = require("fs");
const path = require("path");

const process = require("process");
// const apiURL =
//   process.env.RENDERHOST === "production"
//     ? "https://beautyblossom-api.onrender.com"
//     : "http://localhost:3000";

// console.log(apiURL);

async function sendEmail(paths, req, res) {
  const { title, text, to, subject } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ukr.net",
      port: 2525,
      secure: true,
      auth: {
        user: "beautyblossom@ukr.net",
        pass: "mCWZuZ4ceDExLMmk",
      },
    });

    const imagesHtml = paths
      .map((image) => `<img src='cid:${image.cid}'">`)
      .join("");

    const mailOptions = {
      from: "beautyblossom@ukr.net",
      to,
      subject,
      html: `
      <body style="text-align: center; background-color: #fff; color:#000000; fontSize: 18px">
      <h3 style="font-weight: bold; color:#000000; font-size: 22px">${title}</h3>
      <pre style="margin-top: 20px; color:#000000; font-size: 18px; font-family: 'Inter', sans-serif; font-weight: 400;">
      ${text}
      </pre>
      
      <div style="
        display: 'flex';
        justifyContent: 'center',
        gap: 20px;
        margin-top: 20px;
      ">
        ${imagesHtml}
      </div>

      <a href="https://beautyblossom.com.ua/" style="
        display: block;
        width: 80%;
        margin: 20px auto;
        padding: 10px;
        border: 1px solid #868686;
        border-radius: 262px;
        text-align: center;
        text-decoration: none;
        background: #fed7f3;
        font-family: 'Noto Sans', sans-serif;
        font-weight: 400;
        font-size: 27px;
        text-align: center;
        color: #000;
      ">Перейти на сайт</a>

      <p style="color:#000000; font-size: 18px">Відправлено з сайту Beauty Blossom</p>


        <ul style="
          list-style-type: none;
          padding: 0;
          display: -webkit-inline-box;
          justifyContent: center;
          align-items: center;
        ">
          <li style="margin-right: 10px;">
            <a href="https://tinyurl.com/mh4zwdux" style="
              display: block;
              padding: 10px;
              border: 1px solid #868686;
              border-radius: 262px;
              text-align: center;
              text-decoration: none;
              background: #ecb7ff;
              font-family: 'Noto Sans', sans-serif;
              font-weight: 400;
              font-size: 27px;
              text-align: center;
              color: #000;
              min-width: 143px;
            ">Viber</a>
          </li>
          <li style="margin-right: 10px;">
            <a href="https://invite.viber.com/?g2=AQBjEaVPVoQvBVJyynmJykhGNyF1TYTNKqRX1LQe7fdkVyzcb%2BAcG6%2F4HUH74WIs&lang=ru" style="
              display: block;
              padding: 10px;
              border: 1px solid #868686;
              border-radius: 262px;
              text-align: center;
              text-decoration: none;
              background: #b7d8ff;
              font-family: 'Noto Sans', sans-serif;
              font-weight: 400;
              font-size: 27px;
              text-align: center;
              color: #000;
              margin-left: auto;
              margin-right: auto;
              min-width: 143px;

            ">Telegram</a>
          </li>
          <li>
            <a href="https://www.instagram.com/beauty_blossom_opt" style="
              display: block;
              padding: 10px;
              border: 1px solid #868686;
              border-radius: 262px;
              text-align: center;
              text-decoration: none;
              background: #ffdab7;
              font-family: 'Noto Sans', sans-serif;
              font-weight: 400;
              font-size: 27px;
              text-align: center;
              color: #000;
              min-width: 143px;

            ">Instagram</a>
          </li>
        </ul>


      <p style="color:#000000; font-size: 18px ">*При будь-яких питаннях звертайтесь до Світлани за номером: 0500529100 (Viber, Telegram)</p>
      <p style="color:#000000; font-size: 18px ">З повагою, команда Beauty Blossom!</p>
      <p style="color:#000000; font-size: 18px ">${new Date().toLocaleString()}</p>
    </body>
      `,
      attachments: paths,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email is sent:", result);
    deleteOldImages();
    // Повертаємо об'єкт з повідомленням для фронтенду
    return { message: "Email is sent, please check the inbox", success: true };
  } catch (error) {
    console.log("An error occurred:", error);
    // Повертаємо об'єкт з повідомленням про помилку для фронтенду
    return {
      message: "Error occurred while sending the email",
      success: false,
    };
  }
}

function deleteOldImages() {
  const apiURL =
    process.env.NODE_ENV === "production"
      ? "/var/public/uploads"
      : "public/uploads";

  console.log(apiURL);
  // const directory = path.join(__dirname, "../public/uploads");
  const directory = apiURL;
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
        console.log(`Deleted file: ${file}`);
      });
    }
  });
}

module.exports = {
  sendEmail: ctrlWrapper(sendEmail),
};

//   <body style="text-align: center; background-color: #fff; color:#000000; fontSize: 18px">
//   <h3 style="font-weight: bold; color:#000000; font-size: 22px">${title}</h3>
//   <pre style="margin-top: 20px; color:#000000; font-size: 18px; font-family: 'Inter', sans-serif; font-weight: 400;">
//   ${text}
//   </pre>
//   <pre style="margin-top: 20px; color:#000000; font-size: 18px; font-family: 'Inter', sans-serif; font-weight: 400;">
//     Ми помітили, що ви нещодавно наповнювали корзину товарами, але вона так і залишилась незавершеною.
//     Нам дуже кортить дізнатись, що саме стало на заваді оформити замовлення до кінця?

//     Ми хочемо продовжувати співпрацю з вами в майбутньому, а тому ДАРУЄМО ВАМ ЗНИЖКУ на наступні:
//     <br>
//     При замовленні від 10 тис грн - знижка 3%
//     <br>
//     При замовленні від 20 тис грн - знижка 5%

//     Знижка діє необмежену кількість замовлень, проте лише до 01.04.2024 року

//     А також, поспішаємо вас повідомити, що ми отримали поповнення брендів: Bilou, Carmex, Lador, Laneige.
//     Зараз саме час оформити замовлення.
//   </pre>

//   <div style="
//     display: 'flex';
//     justifyContent: 'center',
//     gap: 20px;
//     margin-top: 20px;
//   ">
//     ${imagesHtml}
//   </div>

//   <a href="https://beautyblossom.com.ua/" style="
//     display: block;
//     width: 80%;
//     margin: 20px auto;
//     padding: 10px;
//     border: 1px solid #868686;
//     border-radius: 262px;
//     text-align: center;
//     text-decoration: none;
//     background: #fed7f3;
//     font-family: 'Noto Sans', sans-serif;
//     font-weight: 400;
//     font-size: 27px;
//     text-align: center;
//     color: #000;
//   ">Перейти на сайт</a>

//   <p style="color:#000000; font-size: 18px">Відправлено з сайту Beauty Blossom</p>

//     <ul style="
//       list-style-type: none;
//       padding: 0;
//       display: -webkit-inline-box;
//       justifyContent: center;
//       align-items: center;
//     ">
//       <li style="margin-right: 10px;">
//         <a href="https://tinyurl.com/mh4zwdux" style="
//           display: block;
//           padding: 10px;
//           border: 1px solid #868686;
//           border-radius: 262px;
//           text-align: center;
//           text-decoration: none;
//           background: #ecb7ff;
//           font-family: 'Noto Sans', sans-serif;
//           font-weight: 400;
//           font-size: 27px;
//           text-align: center;
//           color: #000;
//           min-width: 143px;
//         ">Viber</a>
//       </li>
//       <li style="margin-right: 10px;">
//         <a href="https://invite.viber.com/?g2=AQBjEaVPVoQvBVJyynmJykhGNyF1TYTNKqRX1LQe7fdkVyzcb%2BAcG6%2F4HUH74WIs&lang=ru" style="
//           display: block;
//           padding: 10px;
//           border: 1px solid #868686;
//           border-radius: 262px;
//           text-align: center;
//           text-decoration: none;
//           background: #b7d8ff;
//           font-family: 'Noto Sans', sans-serif;
//           font-weight: 400;
//           font-size: 27px;
//           text-align: center;
//           color: #000;
//           margin-left: auto;
//           margin-right: auto;
//           min-width: 143px;

//         ">Telegram</a>
//       </li>
//       <li>
//         <a href="https://www.instagram.com/beauty_blossom_opt" style="
//           display: block;
//           padding: 10px;
//           border: 1px solid #868686;
//           border-radius: 262px;
//           text-align: center;
//           text-decoration: none;
//           background: #ffdab7;
//           font-family: 'Noto Sans', sans-serif;
//           font-weight: 400;
//           font-size: 27px;
//           text-align: center;
//           color: #000;
//           min-width: 143px;

//         ">Instagram</a>
//       </li>
//     </ul>

//   <p style="color:#000000; font-size: 18px ">*При будь-яких питаннях звертайтесь до Світлани за номером: 0500529100 (Viber, Telegram)</p>
//   <p style="color:#000000; font-size: 18px ">З повагою, команда Beauty Blossom!</p>
//   <p style="color:#000000; font-size: 18px ">${new Date().toLocaleString()}</p>
// </body>
