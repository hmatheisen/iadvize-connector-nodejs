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
}

module.exports = AssistantHelpers;
