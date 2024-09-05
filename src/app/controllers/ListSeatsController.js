import Seat from '../schemas/Seat'
import * as Yup from 'yup'

class ListSeatsController {
  async store(request, response) {
    const schema = Yup.object().shape({
      seatNumber: Yup.array().required().of(Yup.string().required()),
      ShowDateTime: Yup.date().required(),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.errors || err.inner.map((e) => e.message)
      return response.status(400).json({ error: validationErrors })
    }

    const { seatNumber, ShowDateTime } = request.body

    // isso pode ser feito de várias maneiras (resumindo, vou fazer isso depois)
    // Aqui, por exemplo, estamos assumindo que o nome do show é fixo ou vem de outra lógica
    const ShowName = 'Uma Aventura dos brinquedos'

    // Verifica assentos já está reservado
    const reservedSeats = await Seat.findOne({
      ShowName,
      ShowDateTime,
      seatNumber: { $elemMatch: { $in: seatNumber } },
    })
    if (reservedSeats) {
      return response
        .status(400)
        .json({ error: 'Some seats are already reserved.' })
    }

    const seatOrder = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      seatNumber,
      ShowName,
      ShowDateTime,
    }

    const seatOrderResponse = await Seat.create(seatOrder)
    return response.status(200).json(seatOrderResponse)
  }

  async index(request, response) {
    try {
      const seats = await Seat.find() // Busca todos os assentos no banco
      const seatData = seats.map((seat) => ({
        _id: seat._id,
        seatNumber: seat.seatNumber,
        ShowDateTime: seat.ShowDateTime,
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
