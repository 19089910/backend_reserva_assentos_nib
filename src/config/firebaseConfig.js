import admin from 'firebase-admin'
import serviceAccount from './path/to/your-service-account-file.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-database-name.firebaseio.com',
})

module.exports = admin
