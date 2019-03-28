require('dotenv').config();
const Assistant = require('watson-developer-cloud/assistant/v2');

// Create the Assistant Service
// The SDK fetches automatically your credentials in your .env file
const assistant = new Assistant({
  version: '2018-11-08',
});

module.exports = assistant;
