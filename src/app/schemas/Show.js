import mongoose from 'mongoose'

const SeatSchema = new mongoose.Schema({
  seatNumber: {
    type: String, // Exemplo: 'A1', 'B2'
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
})

const DateSchema = new mongoose.Schema({
  showDateTime: {
    type: Date,
    required: true,
  },
  seats: [SeatSchema], // Lista de assentos para este horário
})

const ShowSchema = new mongoose.Schema(
  {
    showName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bannerUrl: {
      type: String,
      required: true,
    },
    postUrl: {
      type: String,
      required: true,
    },
    dates: [DateSchema], // Lista de horários com assentos
  },
  { timestamps: true },
)

export default mongoose.model('Show', ShowSchema)
