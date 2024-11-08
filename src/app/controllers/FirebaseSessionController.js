import admin from '../../config/firebaseConfig'

class FirebaseSessionController {
  async store(request, response) {
    const { idToken } = request.body // O front-end deve enviar o token Firebase recebido após o login
    try {
      // Verifica o token com o Firebase Admin
      const decodedToken = await admin.auth().verifyIdToken(idToken)
      const uid = decodedToken.uid

      // Opcional: criar um token JWT próprio para a aplicação
      const customToken = await admin.auth().createCustomToken(uid)
      response.json({ customToken })
    } catch (error) {
      response.status(401).json({ message: 'Autenticação falhou', error })
    }
  }
}
export default new FirebaseSessionController()
