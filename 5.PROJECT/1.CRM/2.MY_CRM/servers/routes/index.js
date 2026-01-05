const express = require("express");

const usersRouter = require("./server_users.js");
const storesRouter = require("./server_stores.js");
const itemsRouter = require("./server_items.js");
const ordersRouter = require("./server_orders.js");
const orderItemsRouter = require("./server_orderitems.js");
const kioskRouter = require("./server_kiosk.js");



const router = express.Router();

router.use("/", usersRouter);
router.use("/", storesRouter);
router.use("/", itemsRouter);
router.use("/", ordersRouter);
router.use("/", orderItemsRouter);
router.use("/", kioskRouter);

module.exports = router;

