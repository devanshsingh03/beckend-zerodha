const { model } = require("mongoose");
const { PositionSchema } = require("../Schemas/Positions.js");
const PositionModel = new model("Position", PositionSchema);
module.exports = { PositionModel };