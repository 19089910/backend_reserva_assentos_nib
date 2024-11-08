import admin from 'firebase-admin'
import serviceAccount from './path/to/your-service-account-file.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    process.env.FIREBASE_DATABASE_URL ||
    'https://your-database-name.firebaseio.com',
})

export default admin
