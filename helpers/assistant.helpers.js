require('dotenv').config();
const uuid = require('uuid/v1');

const { assistant } = require('../config');
const IAdvizeHelpers = require('./iadvize.helpers');

const iAdvizeHelpers = new IAdvizeHelpers();

class AssistantHelpers {
	constructor() {
		this.session_id = "";
		this.transferResponse = null;

		this.getRoutingRules();
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
			genericArray.forEach(genericEl => {
				replies.push(this.createIAdvizeReplyElement(genericEl));
			});
		}

		return replies;
	}


	// Create the reply object depending on the Assistant's response type
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
				let quickRepliesArray = [];
				genericElement.options.forEach(el => {
					quickRepliesArray.push({
						contentType: "text/quick-reply",
						value: el.label,
						idQuickReply: uuid(),
					});
				});
				return {
					type: "message",
					payload: {
						contentType: "text",
						value: genericElement.title,
					},
					quickReplies: quickRepliesArray
				}
			case "connect_to_agent":
				return this.transferResponse;
			case "suggestion":
				return {
					type: "message",
					payload: {
						contentType: "text",
						value: "Watson replied with a suggestion response type but it is not implemented yet"
					}
				}
			case "search":
				// A url parameter can be null => replace "null" with ""
				for (let i = 0; i < 3; i++) {
					const result = genericElement.results[i];
					if (result.url == null) {
						result.url = "";
					}
				}
				// Return the header and the 3 first results with title, body and url
				return {
					type: "message",
					payload: {
						contentType: "text",
						value: genericElement.header +
							"<br /><br />" +
							genericElement.results[0].title +
							"<br />" +
							genericElement.results[0].body +
							"<br />" +
							genericElement.results[0].url +
							"<br /><br />" +
							genericElement.results[1].title +
							"<br />" +
							genericElement.results[1].body +
							"<br />" +
							genericElement.results[1].url +
							"<br /><br />" +
							genericElement.results[2].title +
							"<br />" +
							genericElement.results[2].body +
							"<br />" +
							genericElement.results[2].url
					}
				}
		}
	}

	// Fetch the Routing Rules from the OAuth API
	getRoutingRules() {
		// Retrieve token then retrieve routing rules
		return iAdvizeHelpers.retrieveToken()
			.then(resp => iAdvizeHelpers.retrieveRoutingRule(JSON.parse(resp).access_token))
			.then(resp => {
				// Create the 'transfer' object response if the request resolve
				this.transferResponse = {
					type: "transfer",
					distributionRule: JSON.parse(resp).data.routingRules[0].id
				}
			})
			.catch(err => {
				// Create a message error response if the request rejects
				this.transferResponse = {
					type: "message",
					payload: {
						contentType: "text",
						value: "Something went wrong during the transfer : " + err
					}
				}
			});
	}
}

module.exports = AssistantHelpers;
