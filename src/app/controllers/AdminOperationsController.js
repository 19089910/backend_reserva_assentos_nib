import Show from '../schemas/Show.js'
import User from '../schemas/User'
import * as Yup from 'yup'

class AdminOperationsController {
  async store(request, response) {
    const schema = Yup.object().shape({
      ShowName: Yup.string().required(),
      ShowDateTime: Yup.date().required(),
      seats: Yup.array().required().of(Yup.string().required()), // Lista de assentos disponíveis
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.errors || err.inner.map((e) => e.message)
      return response.status(400).json({ error: validationErrors })
    }

    // validação do administrador
    const { admin: isAdmin } = await User.findByPk(request.userId)
    if (!isAdmin) return response.status(401).json()

    const { ShowName, ShowDateTime, seats } = request.body

    const show = {
      ShowName,
      ShowDateTime,
      seats,
    }

    const showResponse = await Show.create(show)
    return response.status(200).json(showResponse)
  }

  // Aqui viriam as operações de PUT e DELETE que vamos implementar depois.
}

export default new AdminOperationsController()
