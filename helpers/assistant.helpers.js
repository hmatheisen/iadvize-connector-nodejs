require('dotenv').config();
const { assistant } = require('../config');

class AssistantHelpers {
	constructor() {
		this.session_id = "";
	}

	// Create Assistant Session
	createSession() {
		return new Promise((resolve, reject) => {
			const params = {
				assistant_id: process.env.ASSISTANT_ID
			};

			assistant.createSession(params, (err, response) => {
				if (err) {
					reject(err);
				} else {
					this.session_id = response.session_id;
					resolve();
				}
			});
		});
	}

	// Send a Message to Watson Assistant
	sendMessage(message) {
		return new Promise((resolve, reject) => {
			const params = {
				assistant_id: process.env.ASSISTANT_ID,
				session_id: this.session_id,
				input: {
					"message_type": "text",
					"text": message,
				}
			};

			assistant.message(params, (err, response) => {
				if (err) {
					reject(err);
				} else {
					resolve(response);
				}
			});
		});
	}

	// Create iAdvize's reply array
	createIAdvizeReplyArray(genericArray) {
		let replies = [];
		// If watson sent only one response
		if (genericArray.length == 1) {
			// Push the reply into the replies array
			replies.push(this.createIAdvizeReplyElement(genericArray[0]));
		} else {
			// Push every replies in the replies array
			genricArray.forEach(genericEl => {
				replies.push(this.createIAdvizeReplyElement(genericEl));
			});
		}

		return replies;
	}


	// Create the reply object dependaing on the Assistant's response type
	createIAdvizeReplyElement(genericElement) {
		// Create iAdvize's response depending on the response type
		switch (genericElement.response_type) {
			case "text":
				return {
					type: "message",
					payload: {
						contentType: "text",
						value: genericElement.text
					}
				}
			case "pause":
				return {
					type: "await",
					duration: {
						unit: "millis",
						value: genericElement.time
					}
				}
			case "image":
				return {
					type: "message",
					payload: {
						contentType: "text",
						value: "Watson replied with an image, but I cannot show images yet"
					}
				}
			case "option":
				return {
					type: "message",
					payload: {
						contentType: "text",
						value: "Watson replied with an option response type but it is not implemented yet"
					}
				}
			case "connect_to_agent":
				return {
					type: "message",
					payload: {
						contentType: "text",
						value: "Watson replied with a connect_to_agent response type but it is not implemented yet"
					}
				}
			case "suggestion":
				return {
					type: "message",
					payload: {
						contentType: "text",
						value: "Watson replied with a suggestion response type but it is not implemented yet"
					}
				}
		}
	}

}

module.exports = AssistantHelpers;
