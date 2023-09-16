const express = require("express");
const {
    senderMessage,
  Receiversms,ConfirmationMessage
} = require("../controller/sms.controller");

const router = express.Router();

router.post("/sms", Receiversms);
router.post("/send-initial-message", senderMessage);
router.post("/confirmation", ConfirmationMessage);

module.exports = router;
