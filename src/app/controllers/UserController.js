import { v4 } from 'uuid'
import User from '../schemas/User'

class UserController {
  async store(request, response) {
    // perga via body do front
    const { name, email, password, admin } = request.body

    // manda para o model User e ainda armazena em variavel user
    const user = await User.create({
      id: v4(),
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
