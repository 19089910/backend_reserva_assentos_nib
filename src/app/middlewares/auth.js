/**
 * will be discontinued by google signin
 */
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

export default (request, response, next) => {
  const authToken = request.headers.authorization // As rotas que quero bloquear estão enviando o token desta forma de registro

  // verificar se enviar token
  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' })
  }

  const token = authToken.split(' ')[1]

  // Verifique se o token de criptografia está correto
  try {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) throw new Error()

      // vamos capturar essas infomrações na cração do controller/SeatController.js
      // console.log(decoded) user={ id: name: iat: exp: }
      request.userId = decoded.id
      request.userName = decoded.name

      return next()
    })
  } catch (err) {
    return response.status(401).json({ error: 'Token is invalid' })
  }
}
