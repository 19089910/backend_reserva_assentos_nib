import admin from 'firebase-admin'
import dotenv from 'dotenv'

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config()

// Parse do serviço Firebase Service Account da variável de ambiente
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    process.env.FIREBASE_DATABASE_URL ||
    'https://your-database-name.firebaseio.com',
})

export default admin
