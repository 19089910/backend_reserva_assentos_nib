import Seat from '../schemas/Seat'
import * as Yup from 'yup'

class ListSeatsController {
  async store(request, response) {
    console.log('reservedSeats:', request.body)
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

  async update(request, response) {
    const schema = Yup.object().shape({
      seatNumber: Yup.array().of(Yup.string()),
      ShowDateTime: Yup.date(),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.errors || err.inner.map((e) => e.message)
      return response.status(400).json({ error: validationErrors })
    }

    const { id: _id } = request.params
    const { seatNumber, showDateTime } = request.body

    // Validação se reserva ID existe
    const reservationExists = await Seat.findById(_id)
    if (!reservationExists) {
      return response
        .status(400)
        .json({ error: 'Make sure your category ID is correct' })
    }

    // Verifica assentos já está reservado
    const reservedSeats = await Seat.findOne({
      _id: { $ne: _id }, // Exclui a reserva atual da consulta
      showDateTime,
      seatNumber: { $in: seatNumber },
    })
    if (reservedSeats) {
      return response
        .status(400)
        .json({ error: 'Some seats are already reserved.' })
    }

    // const updatedSeat = await Seat.updateOne(
    // {
    // seatNumber,
    //      ShowDateTime,
    //  },
    //  { new: true }, // Retorna o documento atualizado
    // )
    return response.status(200).json(reservedSeats)
  }

  async delete(request, response) {}
}

export default new ListSeatsController()
