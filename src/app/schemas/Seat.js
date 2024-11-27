import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const SeatSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 }, // Identificador único para cada assento
    user: {
      id: { type: String, requered: true },
      name: { type: String, requered: true },
    },
    seatNumber: {
      type: [String], // Array de strings representando assentos, ex: ["A1", "A2", "B3"]
      default: [],
    },
    showName: {
      type: String,
      required: true,
    },
    showDateTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
)
/** garantir que a combinação de seatNumber e ShowDateTime seja única em cada documento.
 * Isso evitaria reservas duplicadas de assentos para a mesma data.
 */
SeatSchema.index({ seatNumber: 1, showDateTime: 1 }, { unique: true })

module.exports = mongoose.model('Seat', SeatSchema)
