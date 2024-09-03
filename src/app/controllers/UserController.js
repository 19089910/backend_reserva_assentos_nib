import { v4 } from 'uuid'
import User from '../schemas/User'
import * as Yup from 'yup'

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be at least 4 characters'),
      admin: Yup.boolean(),
    })
    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      const validationErrors = err.errors || err.inner.map((e) => e.message)
      return response.status(400).json({ error: validationErrors })
    }

    const { name, email, password, admin } = request.body

    // Verificar se o usuário já existe
    // O método findOne do Mongoose não utiliza where. Apenas passe o objeto de consulta diretamente.
    const userExists = await User.findOne({ email })
    if (userExists) {
      return response.status(409).json({ error: 'User already existe' })
    }

    // manda para o model User e ainda armazena em variavel user
    const user = await User.create({
      _id: v4(),
      name,
      email,
      password,
      admin,
    })

    return response.status(201).json({ id: user.id, name, email, admin })
    // ps: nao e interecante retornar password_hash...
  }
}

export default new UserController()
