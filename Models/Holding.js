const { model } = require("mongoose");
const { HoldingSchema } = require("../Schemas/Holding.js");
const HoldingModel = new model("Holding", HoldingSchema);
module.exports = { HoldingModel };