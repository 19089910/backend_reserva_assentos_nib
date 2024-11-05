import mongoose from 'mongoose'

const ShowSchema = new mongoose.Schema(
  {
    ShowName: {
      type: String,
      required: true,
    },
    ShowDateTime: {
      type: Date,
      required: true,
    },
    seats: {
      type: [String], // Lista de assentos disponíveis para o show
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Show', ShowSchema)
