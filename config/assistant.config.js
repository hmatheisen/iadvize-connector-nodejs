require('dotenv').config();

const Assistant = require('watson-developer-cloud/assistant/v2');
const assistant = new Assistant({
  username: process.env.ASSISTANT_USERNAME,
  password: process.env.ASSISTANT_PASSWORD,
  version: '2018-11-08'
});

module.exports = assistant;
