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

    /** feat: Verifica assentos já está reservado
     *consegue: percorrer por todas os seatId ir ao seatNumber e
      comparar as listas de strings ["A1", "A2", "B3"] para fazer
      a validação de que a "A1" nao esta disponivel?
     *
     *
     * */

    // isso pode ser feito de várias maneiras (resumindo, vou fazer isso depois)
    // Aqui, por exemplo, estamos assumindo que o nome do show é fixo ou vem de outra lógica
    const ShowName = 'Uma Aventura dos brinquedos'

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
      return response.status(200).json(seats.seatNumber) // Retorna a lista de assentos
    } catch (error) {
      return response.status(500).json({
        error: 'CHAME O PROGRADOR URGENTE PQ NAO ERA PARA VOCE ESTA AQUI!!',
      })
    }
  }

  async update(request, response) {}
  async delete(request, response) {}
}
export default new ListSeatsController()
