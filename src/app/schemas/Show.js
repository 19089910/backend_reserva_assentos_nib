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
    bannerPath: {
      type: String,
      required: true,
    },
    postPath: {
      type: String,
      required: true,
    },
    dates: [DateSchema], // Lista de horários com assentos
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Inclui os campos virtuais no JSON
    toObject: { virtuals: true }, // Caso você precise usar toObject
  },
)

// Virtual para a Url
ShowSchema.virtual('bannerUrl').get(function () {
  return `http://localhost:3001/banner-file/${this.bannerPath}`
})

// Virtual para o postUrl
ShowSchema.virtual('postUrl').get(function () {
  return `http://localhost:3001/post-file/${this.postPath}`
})

export default mongoose.model('Show', ShowSchema)
