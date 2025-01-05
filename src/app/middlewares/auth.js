import admin from '../../config/firebaseConfig'

export default async (request, response, next) => {
  const authToken = request.headers.authorization // As rotas que quero bloquear estão enviando o token desta forma de registro

  // verificar se enviar token
  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' })
  }

  const token = authToken.split(' ')[1]

  // Verifique se o token de criptografia está correto
  try {
    const decodedToken = admin.auth().verifyIdToken(token)

    // vamos capturar essas infomrações na cração do controller/SeatController.js
    // console.log(decoded) user={ id: name: iat: exp: }
    request.userId = decodedToken.uid // ID do usuário
    request.userName = decodedToken.name || decodedToken.email // Nome ou email
    request.claims = decodedToken // Todas as claims personalizadas

    return next()
  } catch (err) {
    return response.status(401).json({ error: 'Token is invalid' })
  }
}
