const mongoose = require('mongoose')

const SeatSchema = new mongoose.Schema(
  {
    seatId: { type: String, required: true, unique: true }, // Identificador único para cada assento
    user: {
      id: { type: String, requered: true },
      name: { type: String, requered: true },
    },
    seatNumber: {
      type: [String], // Array de strings representando assentos, ex: ["A1", "A2", "B3"]
      default: [],
    },
    ShowName: {
      type: String,
      required: true,
    },
    ShowDateTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Seat', SeatSchema)
