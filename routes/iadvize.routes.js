const router = require('express').Router();
const { IadvizeController } = require('../controllers');

const iadvizeController = new IadvizeController();

router.get("/external-bots", (req, res) => {
  iadvizeController.getExternalBots(req, res);
});

router.get("/bots/:idOperator", (req, res) => {
  iadvizeController.getBot(req, res);
});

router.post("/conversations", (req, res) => {
  iadvizeController.postFirstMessage(req, res);
});

router.post("/conversations/:conversationId/messages", (req, res) => {
  iadvizeController.postMessages(req, res);
});

router.get("/availability-strategies", (req, res) => {
  iadvizeController.getAvailabilityStrategies(req, res);
});

module.exports = router;
