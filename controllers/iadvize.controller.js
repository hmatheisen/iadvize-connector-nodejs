require('dotenv').config();
const { AssistantHelpers } = require('../helpers');

const assistantHelpers = new AssistantHelpers();

class IadvizeController {
  // GET /external-bots
  getExternalBots(req, res) {
    // Create the bots array
    const bots = [
      {
        idBot: process.env.ID_BOT,
        name: process.env.NAME,
        description: "",
        editorUrl: process.env.EDITOR_URL,
      }
    ];

    // Send the response
    res.status(200).send(bots);
  }

  // GET /bots/:idOperator:
  getBot(req, res) {
    // Get 'idOperator' from url params
    const idOperator = req.params.idOperator;

    // Create the bot infos
    const botinfo = {
      idOperator: idOperator,
      external: {
        idBot: process.env.ID_BOT,
        name: process.env.NAME,
        description: "",
        editorUrl: process.env.EDITOR_URL
      },
      distributionRules: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Send the response
    res.status(200).send(botinfo);
  }

  // POST /conversations
  postFirstMessage(req, res) {
    // Get body
    const body = req.body;

    // Create the Assistant Session
    assistantHelpers.createSession()
      .then(() => {
        // Create an empty response
        const response = {
          idConversation: body.idConversation,
          idOperator: body.idOperator,
          replies: [],
          variables: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        // Send the response
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

  // POST /conversations/:conversationId:/messages
  postMessages(req, res) {
    // Get 'conversationId' from url params
    const conversationId = req.params.conversationId;
    // Get body
    const body = req.body;

    // If the message is sent by the operator, do not answer.
    if (req.body.message.author.role === "operator") {
      // Create an empty response
      const response = {
        idConversation: conversationId,
        idOperator: body.idOperator,
        replies: [],
        variables: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      // Send response
      res.status(200).send(response)
    } else {
      assistantHelpers.sendMessage(body.message.payload.value)
        .then(assistantResponse => {
          // Create a response with watson's answer
          
          const response = {
            idConversation: conversationId,
            idOperator: body.idOperator,
            replies: assistantHelpers.createIAdvizeReplyArray(assistantResponse.output.generic),
            variables: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          // Send the Response
          res.status(200).send(response);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    }
  }

  // GET /availability-strategies
  getAvailabilityStrategies(req, res) {
    const strategies = [
      {
        strategy: "customAvailability",
        availability: true,
      }
    ];

    res.status(200).send(strategies);
  }

}

module.exports = IadvizeController;
