const express = require("express");
const router = express.Router();

const itemRouter = require("../routes/item.routes");
const orderItem = require("../routes/order_item.routes");
// const itemOrderCustomer = require("../routes/itemOrderCustomer.routes");
// const option = require("../routes/options.routes");

router.use("/", [itemRouter, orderItem, itemOrderCustomer, option]);

module.exports = router;
