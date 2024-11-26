import Show from '../schemas/Show.js'
import * as Yup from 'yup'

class AdminOperationsController {
  async store(request, response) {
    const schema = Yup.object().shape({
      showName: Yup.string().required(),
      description: Yup.string().required(),
      bannerUrl: Yup.string().url().required(),
      postUrl: Yup.string().url().required(),
      dates: Yup.array()
        .of(
          Yup.object().shape({
            showDateTime: Yup.date().required(),
            seats: Yup.array()
              .of(
                Yup.object().shape({
                  seatNumber: Yup.string().required(),
                  isAvailable: Yup.boolean().required(),
                }),
              )
              .required(),
          }),
        )
        .required(),
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.inner.map((e) => e.message)
      return response.status(400).json({ error: validationErrors })
    }

    // validação do administrador
    // const { admin: isAdmin } = await User.findByPk(request.userId)
    // if (!isAdmin) return response.status(401).json()

    const { showName, description, bannerUrl, postUrl, dates } = request.body

    const show = {
      showName,
      description,
      bannerUrl,
      postUrl,
      dates,
    }

    const showResponse = await Show.create(show)
    return response.status(200).json(showResponse)
  }

  async index(request, response) {
    try {
      const shows = await Show.find() // Busca todas as informações do show
      const showData = shows.map((show) => ({
        _id: show._id,
        showName: show.showName,
        description: show.description,
        bannerUrl: show.bannerUrl,
        postUrl: show.postUrl,
        dates: show.dates,
        updatedAt: show.updatedAt,
      }))
      return response.status(200).json(showData)
    } catch (error) {
      return response.status(500).json({
        error: 'CHAME O PROGRADOR URGENTE PQ NAO ERA PARA VOCE ESTA AQUI!!',
      })
    }
  }
  // Aqui viriam as operações de PUT e DELETE que vamos implementar depois.
}

export default new AdminOperationsController()
