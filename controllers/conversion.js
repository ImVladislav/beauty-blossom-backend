const axios = require("axios");

const send = async (req, res) => {
	// eslint-disable-next-line camelcase
	const {event_name, event_time, event_id, event_source_url, user_data = {}} = req.body;

	const pixelId = '789745059892711';
	const accessToken = 'EAA04OeuiMK8BO9ibuOGZCCgfOhpEMUhdsoiKK1VlNgWVUA7LB43A9bwpJqdAQyRzYuJxpAx7Ad63pDU2ZClOmerZAXTZBAQB6S2oyMgD08vRCJrsZAIa3cQapueQGRZBSGUUwKMuKX6xW9AvJq38ERWpyRnZAnpv67HFaJY3qHzLxr62ZCJ7CZBjjfsKX0WCPvlBEaQZDZD';

	const payload = {
		data: [
			{
				event_name:       event_name,
				event_time:       event_time,
				event_id:         event_id,
				event_source_url: event_source_url,
				action_source:    "website",
				user_data:        {
					// eslint-disable-next-line camelcase
					...user_data,
					client_user_agent: req.headers["user-agent"],
					client_ip_address: req.ip,
				},
			},
		],
	};

	try {
		const url = `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`;
		const response = await axios.post(url, payload);
		res.status(200).json({success: true, fb_response: response.data});
	} catch (err) {
		console.error("Facebook Conversions API error:", err.response?.data || err.message);
		res.status(500).json({error: "Failed to send conversion event"});
	}
};

module.exports = {
	send,
};
