const mongoose = require("mongoose");

const MeasurementConversionSchema = new mongoose.Schema({
  unitOfMeasurementId: { type: mongoose.Schema.Types.ObjectId, ref: "UnitOfMeasurement", required: true },
  conversionValue: { type: Number, required: true }
})

const UnitOfMeasurementSchema = new mongoose.Schema({
  measurementName: { type: String, required: true },
  description: { type: String, required: true },
  value: { type: Number, required: true },
  conversions: [{ type: MeasurementConversion }],
  dateCreated: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = {UnitOfMeasurement: mongoose.model("UnitOfMeasurement", UnitOfMeasurementSchema), MeasurementConversion: mongoose.model("MeasurementConversion", MeasurementConversionSchema)};