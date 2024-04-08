const { ctrlWrapper } = require("../helpers");
const fs = require("fs");
const path = require("path");

const mailer = require("./mailer");

async function sendEmail(paths, req, res) {
  const { title, text, to, subject } = req.body;

  const imagesHtml = paths
    .map((image) => `<img src='cid:${image.cid}'">`)
    .join("");

  try {
    const result = await mailer({
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
            <!-- Додайте інші посилання для месенджерів, які ви використовуєте -->
          </ul>

          <p style="color:#000000; font-size: 18px ">*При будь-яких питаннях звертайтесь до Світлани за номером: 0500529100 (Viber, Telegram)</p>
          <p style="color:#000000; font-size: 18px ">З повагою, команда Beauty Blossom!</p>
          <p style="color:#000000; font-size: 18px ">${new Date().toLocaleString()}</p>
        </body>
      `,
      attachments: paths,
    });

    console.log("Email is sent:", result);
    deleteOldImages();

    return { message: "Email is sent, please check the inbox", success: true };
  } catch (error) {
    console.log("An error occurred:", error);
    return {
      message: "Error occurred while sending the email",
      success: false,
    };
  }
}

function deleteOldImages() {
  const directory = "/var/public/uploads";
  // const directory = "public/uploads";
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
