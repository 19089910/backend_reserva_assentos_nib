import admin from '../../config/firebaseConfig'

class FirebaseSessionController {
  async store(request, response) {
    const { uid } = request.body // O front-end deve enviar o token Firebase recebido após o login
    if (!uid) {
      return response.status(400).json({ message: 'UID é obrigatório' })
    }
    try {
      // Verifica o token com o Firebase Admin
      await admin.auth().setCustomUserClaims(uid, { admin: true })
      return response
        .status(200)
        .json({ message: 'Usuário agora é um administrador.' })
    } catch (error) {
      response.status(401).json({ message: 'Autenticação falhou', error })
    }
  }
}
export default new FirebaseSessionController()
