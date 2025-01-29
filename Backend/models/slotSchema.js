const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
}, {timestamps: true});

const Slot = mongoose.model("slot", slotSchema);

module.exports = Slot;