import Show from '../schemas/Show.js'
import * as Yup from 'yup'

class AdminOperationsController {
  async store(request, response) {
    const schema = Yup.object().shape({
      showName: Yup.string().required(),
      description: Yup.string().required(),
      /* dates: Yup.array()
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
        .required(), */
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message
        return acc
      }, {})
      return response.status(400).json({ errors: validationErrors })
    }

    // validação do administrador
    // const { admin: isAdmin } = await User.findByPk(request.userId)
    // if (!isAdmin) return response.status(401).json()

    const { showName, description } = request.body
    const dates = JSON.parse(request.body.dates)
    // request.files contém os uploads processados
    const bannerFile = request.files.banner[0]
    const posterFile = request.files.poster[0]

    const show = {
      showName,
      description,
      bannerPath: bannerFile.filename, // Salva apenas o nome do arquivo
      postPath: posterFile.filename, // Salva apenas o nome do arquivo
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

  async update(request, response) {
    const schema = Yup.object().shape({
      showName: Yup.string().required(),
      description: Yup.string().required(),
      /* dates: Yup.array()
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
        .required(), */
    })
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message
        return acc
      }, {})
      return response.status(400).json({ errors: validationErrors })
    }

    // validação do administrador
    // const { admin: isAdmin } = await User.findByPk(request.userId)
    // if (!isAdmin) return response.status(401).json()

    const { id } = request.params
    const showExist = await Show.findByPk(id)
    if (!showExist) {
      return response
        .status(400)
        .json({ error: 'Show not found. Please check the ID.' })
    }

    let bannerPath = showExist.bannerPath // Mantém o valor atual do banco
    if (request.file && request.file.banner && request.file.banner[0]) {
      bannerPath = request.file.banner[0] // Se existir novo arquivo, atualiza
    }

    let postPath = showExist.postPath // Mantém o valor atual do banco
    if (request.file && request.file.poster && request.file.poster[0]) {
      postPath = request.file.poster[0] // Se existir novo arquivo, atualiza
    }
    const { showName, description } = request.body
    const dates = JSON.parse(request.body.dates)

    await Show.update(
      { showName, description, bannerPath, postPath, dates },
      { where: { id } },
    )
    return response.status(200).json()
  }
}

export default new AdminOperationsController()
