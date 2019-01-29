const { AssistantHelper } = require('../helpers');

const assistantHelper = new AssistantHelper();

class IadvizeController {
    // GET /external-bots
    getExternalBots(req, res) {
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
    getBot(req, res) {
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
        }
    
        // Send the response
        res.status(200).send(botinfo)
    }

    // POST /conversations
    postFirstMessage(req, res) {
        // Get body
        const body = req.body;

        assistantHelper.createSession()
            .then(() => {
                return assistantHelper.sendMessage("");
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
                }
        
                // Send the response
                res.status(200).send(response)
            })
            .catch(err => {
                res.status(500).send(err)
            });
    }

    // POST /conversations/:conversationId:/messages
    postMessages(req, res) {
        // Get 'conversationId' from url params
        const conversationId = req.params.conversationId;
        // Get body
        const body = req.body;

        console.log(conversationId);
        console.log(body.idOperator);

        assistantHelper.sendMessage(body.message.payload.value)
            .then(assistantResponse => {

                console.log(JSON.stringify(assistantResponse, null, 2));

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
                }

                // Send the Response
                res.status(200).send(response);
            })
            .catch(err => {
                console.log("coucou")
                res.status(500).send(err)
            })
    }

    // GET /availability-strategies
    getAvailabilityStrategies(req, res) {
        const strategies = [
            {
                strategy: "customAvailability",
                availability: true,
            }
        ]

        res.status(500).send(strategies)
    }

}

module.exports = IadvizeController;