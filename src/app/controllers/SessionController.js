import * as Yup from 'yup'
import User from '../models/User'

class SessionController {
  async store(request, response) {
    // Função para retornar erro de email ou senha incorretos
    const userEmailOrPasswordIncorrect = () => {
      response
        .status(401)
        .json({ error: 'Make sure yor email or password are correct' })
    }

    const schema = Yup.object().shape({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
    })
    if (!(await schema.isValid(request.body))) {
      return userEmailOrPasswordIncorrect()
    }

    const { email, password } = request.body

    // Verifica se o usuário existe e verifica a senha
    const userExists = await User.findOne({
      where: { email },
    })
    if (!userExists) {
      return userEmailOrPasswordIncorrect()
    }
    if (!(await userExists.checkPassword(password))) {
      return userEmailOrPasswordIncorrect()
    }

    return response.json({
      id: userExists.id,
      email,
      name: userExists.name,
      admin: userExists.admin,
    })
  }
}

export default new SessionController()
