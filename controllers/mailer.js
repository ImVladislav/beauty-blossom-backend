const nodemailer = require("nodemailer");
const sendTelegramMessage = require("../helpers/telegram");
const {EMAIL_PORT, EMAIL_USER} = process.env;

const transporter = nodemailer.createTransport({
	host:   "mail.adm.tools",
	port:   EMAIL_PORT,
	secure: true,
	auth:   {
		user: EMAIL_USER,
		pass: 'Adminnimda',
	},
});

const mailer = async (message) => {
	try {
		await transporter.sendMail({
			...message,
			from: EMAIL_USER,
		});
		console.log("Email sent successfully");
	} catch (error) {
		console.error("Error sending email:", error);
		await sendTelegramMessage(
			`❌ Помилка (mailer): ${error.message}\n\n` +
			`Stack:\n${error.stack}\n\n`
		);
		throw new Error("Error sending email");
	}
};

module.exports = mailer;
