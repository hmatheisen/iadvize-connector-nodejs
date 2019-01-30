const { AssistantHelper } = require('../helpers');

class IadvizeController {
    // GET /external-bots
    static getExternalBots(req, res) {
        // Create the bots array
        const bots = [
            {
                idBot: "Watson1234",
                name: "Watson",
                description: "",
                editorUrl: "https://iadvize-connector.eu-gb.mybluemix.net/api/iadvize",
            }
        ];

        // Send the response
        res.status(200).send(bots);
    }

    // GET /bots/:idOperator:
    static getBot(req, res) {
        // Get 'idOperator' from url params
        const idOperator = req.params.idOperator;

        // Create the bot infos
        const botinfo = {
            idOperator: idOperator,
            external: {
                idBot: "Watson1234",
                name: "Watson",
                description: "",
                editorUrl: "https://iadvize-connector.eu-gb.mybluemix.net/api/iadvize"
            },
            distributionRules: "",
            createdAt: "",
            updatedAt: "",
        };
    
        // Send the response
        res.status(200).send(botinfo);
    }

    // POST /conversations
    static postFirstMessage(req, res) {
        // Get body
        const body = req.body;

        AssistantHelper.createSession()
            .then(() => {
                return AssistantHelper.sendMessage("");
            })
            .then(assistantResponse => {
                const response = {
                    idOperator: body.idOperator,
                    idConversation: body.idConversation,
                    replies: [
                        {
                            type: "string",
                            duration: {
                                unit: "",
                                value: 0,
                            },
                            payload: {
                                contentType: "string",
                                value: assistantResponse.output.generic[0].text
                            },
                            quickReplies: null
                        }
                    ],
                    variables: [],
                    createdAt: "",
                    updatedAt: "",
                };
        
                // Send the response
                res.status(200).send(response);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }

    // POST /conversations/:conversationId:/messages
    static postMessages(req, res) {
        // Get 'conversationId' from url params
        const conversationId = req.params.conversationId;
        // Get body
        const body = req.body;

        AssistantHelper.sendMessage(body.message.payload.value)
            .then(assistantResponse => {

                const response = {
                    idConversation: conversationId,
                    idOperator: body.idOperator,
                    replies: [
                        {
                            type: "string",
                            duration: {
                                unit: "",
                                value: 0,
                            },
                            payload: {
                                contentType: "string",
                                value: assistantResponse.output.generic[0].text
                            },
                            quickReplies: null
                        }
                    ],
                    variables: [],
                    createdAt: "",
                    updatedAt: "",
                };

                // Send the Response
                res.status(200).send(response);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }

    // GET /availability-strategies
    static getAvailabilityStrategies(req, res) {
        const strategies = [
            {
                strategy: "customAvailability",
                availability: true,
            }
        ];

        res.status(500).send(strategies);
    }

}

module.exports = IadvizeController;
