const {post} = require("axios");
const TELEGRAM_BOT_TOKEN = '8273401211:AAF4LfnM9tlRpeAJPJjQgZQYYNedRYjYwlc';
const TELEGRAM_CHAT_ID = '-1002530863997';

async function sendTelegramMessage(message) {
	try {
		await post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
			chat_id: TELEGRAM_CHAT_ID,
			text:    message,
		});
	} catch (err) {
		console.error('Помилка надсилання в Telegram:', err.message);
	}
};

module.exports = sendTelegramMessage;