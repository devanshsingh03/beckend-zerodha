const { model } = require("mongoose");
const { OrderSchema } = require("../Schemas/Order.js");
const OrderModel = new model("Order", OrderSchema);
module.exports = { OrderModel };