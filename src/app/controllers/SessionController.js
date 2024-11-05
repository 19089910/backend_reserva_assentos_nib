/**
 *  will be discontinued by google signin
 */
import * as Yup from 'yup'
import User from '../schemas/User'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

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
    // O método findOne do Mongoose não utiliza where. Apenas passe o objeto de consulta diretamente.
    const userExists = await User.findOne({ email })
    if (!userExists) {
      return userEmailOrPasswordIncorrect()
    }
    if (!(await userExists.comparePassword(password))) {
      return userEmailOrPasswordIncorrect()
    }

    return response.json({
      id: userExists.id,
      email,
      name: userExists.name,
      admin: userExists.admin,
      token: jwt.sign(
        { id: userExists.id, name: userExists.name },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        },
      ),
    })
  }
}

export default new SessionController()
