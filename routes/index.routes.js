const express = require("express");
const router = express.Router();

const itemRouter = require("../routes/item.routes");
const orderItem = require("../routes/order_item.routes");
const order = require("../routes/order.routes");
const option = require("../routes/option.routes");

router.use("/", [itemRouter, orderItem, order, option]);

module.exports = router;
