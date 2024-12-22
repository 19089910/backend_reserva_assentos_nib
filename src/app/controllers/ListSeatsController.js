import Seat from '../schemas/Seat'
import * as Yup from 'yup'

class ListSeatsController {
  async store(request, response) {
    const schema = Yup.object().shape({
      seatNumber: Yup.array().required().of(Yup.string().required()),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.errors || err.inner.map((e) => e.message)
      return response.status(400).json({ error: validationErrors })
    }

    const { seatNumber, showDateTime, user } = request.body

    // isso pode ser feito de várias maneiras (resumindo, vou fazer isso depois)
    // Aqui, por exemplo, estamos assumindo que o nome do show é fixo ou vem de outra lógica
    const showName = 'Uma Aventura dos brinquedos'

    // Verifica assentos já está reservado
    const reservedSeats = await Seat.findOne({
      showName,
      showDateTime,
      seatNumber: { $elemMatch: { $in: seatNumber } },
    })
    if (reservedSeats) {
      return response
        .status(400)
        .json({ error: 'Some seats are already reserved.' })
    }

    const seatOrder = {
      user,
      seatNumber,
      showName,
      showDateTime,
    }

    const seatOrderResponse = await Seat.create(seatOrder)
    return response.status(200).json(seatOrderResponse)
  }

  async index(request, response) {
    try {
      const seats = await Seat.find() // Busca todos os assentos no banco

      const seatData = seats.map((seat) => ({
        _id: seat._id,
        user: seat.user,
        seatNumber: seat.seatNumber,
        showDateTime: seat.showDateTime,
        updatedAt: seat.updatedAt,
      }))
      return response.status(200).json(seatData) // Retorna a lista de assentos
    } catch (error) {
      return response.status(500).json({
        error: 'CHAME O PROGRADOR URGENTE PQ NAO ERA PARA VOCE ESTA AQUI!!',
      })
    }
  }

  async delete(request, response) {
    const { id: _id } = request.params
    try {
      const seatOrder = await Seat.findById(_id)
      if (!seatOrder) {
        return response.status(404).json({ error: 'Reservation not found' })
      }

      await Seat.findByIdAndDelete(_id)

      return response
        .status(200)
        .json({ message: 'Reservation deleted successfully' })
    } catch (error) {
      return response.status(500).json({
        error: 'An error occurred while trying to delete the reservation',
      })
    }
  }
}

export default new ListSeatsController()
