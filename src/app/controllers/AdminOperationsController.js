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
      console.log(request.body) // Verificar se os dados estão chegando corretamente
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      // console.log(err) // Verificar os erros completos do Yup
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

  // Aqui viriam as operações de PUT e DELETE que vamos implementar depois.
}

export default new AdminOperationsController()
