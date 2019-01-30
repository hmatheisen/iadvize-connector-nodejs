const router = require('express').Router();
const { IadvizeController } = require('../controllers');

router.get("/external-bots", (req, res) => {
    IadvizeController.getExternalBots(req, res);
});

router.get("/bots/:idOperator", (req, res) => {
    IadvizeController.getBot(req, res);
});

router.post("/conversations", (req, res) => {
    IadvizeController.postFirstMessage(req, res);
});

router.post("/conversations/:conversationId/messages", (req, res) => {
    IadvizeController.postMessages(req, res);
});

router.get("/availability-strategies", (req, res) => {
    IadvizeController.getAvailabilityStrategies(req, res);
});

module.exports = router;
