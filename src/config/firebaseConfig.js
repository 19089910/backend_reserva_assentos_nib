import admin from 'firebase-admin'
import serviceAccount from './firstprojet-115b9-firebase-adminsdk-18ipo-799324b62e.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    process.env.FIREBASE_DATABASE_URL ||
    'https://your-database-name.firebaseio.com',
})

export default admin
